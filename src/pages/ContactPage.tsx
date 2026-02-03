import { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, FileText, X, Phone, BookOpen } from 'lucide-react';
import { supabase, Contact, Program } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState<Contact>({
    name: '',
    email: '',
    message: '',
    resume_url: undefined,
    whatsapp_number: '',
    program_id: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'active')
        .order('title', { ascending: true });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoadingPrograms(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Clear error when user starts typing
    if (error) setError('');

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (error) setError('');

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');

    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file only');
        e.target.value = '';
        return;
      }

      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setError('File size must be less than 2MB');
        e.target.value = '';
        return;
      }

      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    const fileInput = document.getElementById('resume') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate WhatsApp number format if provided
    if (formData.whatsapp_number && formData.whatsapp_number.trim()) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(formData.whatsapp_number.trim())) {
        setError('Please enter a valid WhatsApp number');
        setLoading(false);
        return;
      }
    }

    try {
      let resumeUrl: string | undefined = undefined;

      // Upload resume file if provided
      if (resumeFile) {
        // Sanitize full name - remove special characters, keep spaces or convert to underscores
        const sanitizedName = formData.name
          .trim()
          .replace(/[^a-zA-Z0-9\s\-_]/g, '') // Remove special chars except spaces, hyphens, underscores
          .replace(/\s+/g, '_') // Replace spaces with underscores
          .replace(/_+/g, '_') // Replace multiple underscores with single
          .replace(/^_|_$/g, ''); // Remove leading/trailing underscores

        // Add timestamp to avoid duplicates if same person uploads multiple times
        const timestamp = Date.now();

        // Use full name as filename: "FullName_timestamp.pdf"
        const fileName = `${sanitizedName}_${timestamp}.pdf`;
        const filePath = `resumes/${fileName}`;

        console.log('Uploading file:', { fileName, filePath, size: resumeFile.size });

        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('contacts')
          .upload(filePath, resumeFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'application/pdf'
          });

        if (uploadError) {
          console.error('Upload error details:', uploadError);

          // Provide more specific error messages
          if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('The resource was not found')) {
            throw new Error('Storage bucket not configured. Please create a "contacts" bucket in Supabase Storage.');
          } else if (uploadError.message.includes('new row violates row-level security policy')) {
            throw new Error('Storage access denied. Please configure storage policies to allow public uploads.');
          } else if (uploadError.message.includes('duplicate')) {
            throw new Error('A file with this name already exists. Please try again.');
          } else {
            throw new Error(`Failed to upload resume: ${uploadError.message}`);
          }
        }

        if (!uploadData) {
          throw new Error('Upload failed: No data returned from storage');
        }

        console.log('Upload successful:', uploadData);

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('contacts')
          .getPublicUrl(filePath);

        if (!urlData?.publicUrl) {
          throw new Error('Failed to get public URL for uploaded file');
        }

        resumeUrl = urlData.publicUrl;
        console.log('Resume URL:', resumeUrl);
      }

      // Insert contact data with all fields
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        resume_url: resumeUrl || null,
        whatsapp_number: formData.whatsapp_number?.trim() || null,
        program_id: formData.program_id || null,
      };

      const { error } = await supabase.from('contacts').insert([contactData]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '', resume_url: undefined, whatsapp_number: '', program_id: '' });
      setResumeFile(null);
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Have questions about our programs? We're here to help you start your tech journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar with Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">info@ezzcode.com</p>
                    <p className="text-gray-600">support@ezzcode.com</p>
                  </div>
                </div>
              </div>



              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="font-semibold mb-3">Quick Response</h3>
                <p className="text-blue-100 text-sm">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Main Content - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-900">Message Sent Successfully!</h3>
                      <p className="text-green-700 mt-1">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="whatsapp_number"
                        name="whatsapp_number"
                        value={formData.whatsapp_number}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="program_id" className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Program <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="program_id"
                        name="program_id"
                        value={formData.program_id}
                        onChange={handleSelectChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                        disabled={loadingPrograms}
                      >
                        <option value="">Select a program...</option>
                        {programs.map((program) => (
                          <option key={program.id} value={program.id}>
                            {program.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {loadingPrograms && (
                      <p className="mt-1 text-xs text-gray-500">Loading programs...</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about your interest in our programs..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                      Resume/CV <span className="text-gray-500 text-xs">(PDF only, Max 2MB)</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor="resume"
                          className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {resumeFile ? resumeFile.name : 'Choose PDF file or drag and drop'}
                          </span>
                        </label>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          accept=".pdf,application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        {resumeFile && (
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove file"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      {resumeFile && (
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
