-- Add whatsapp_number and program_id columns to contacts table

-- Add WhatsApp number column (optional)
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS whatsapp_number text;

-- Add program_id column (optional, foreign key to programs table)
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS program_id uuid REFERENCES programs(id);

-- Add comments to document the columns
COMMENT ON COLUMN contacts.whatsapp_number IS 'WhatsApp contact number of the person submitting the form';
COMMENT ON COLUMN contacts.program_id IS 'Reference to the program the person is interested in';

-- Create index on program_id for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_program_id ON contacts(program_id);
