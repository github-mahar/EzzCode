-- Add whatsapp_number and program_id columns to contacts table
-- Both fields are REQUIRED (NOT NULL)

-- Add WhatsApp number column (required)
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS whatsapp_number text NOT NULL DEFAULT '';

-- Add program_id column (required, foreign key to programs table)
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS program_id uuid NOT NULL;

-- Add comments to document the columns
COMMENT ON COLUMN contacts.whatsapp_number IS 'WhatsApp contact number of the person submitting the form (required)';
COMMENT ON COLUMN contacts.program_id IS 'Reference to the program the person is interested in (required)';

-- Create index on program_id for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_program_id ON contacts(program_id);

-- Add check constraint for WhatsApp number format validation
ALTER TABLE contacts 
ADD CONSTRAINT check_whatsapp_format 
CHECK (whatsapp_number ~ '^[+]?[0-9]{1,4}[-\s]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,9}$');
