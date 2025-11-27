import type { NextApiRequest, NextApiResponse } from 'next';

type FormSubmissionData = {
  formIdentifier?: string;
  [key: string]: string | number | boolean | undefined;
};

type ResponseData = {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.',
    });
  }

  try {
    const formData: FormSubmissionData = req.body;
    const { formIdentifier, ...fields } = formData;

    // Log the form submission (in production, you'd save this to a database)
    console.log('Form submitted:', {
      formIdentifier,
      fields,
      timestamp: new Date().toISOString(),
    });

    // Here you would typically:
    // 1. Validate the form data
    // 2. Save to a database
    // 3. Send notification emails
    // 4. Integrate with CRM systems
    // 5. Trigger webhooks
    // etc.

    // Example: Basic validation
    if (!formIdentifier) {
      return res.status(400).json({
        success: false,
        message: 'Form identifier is required.',
      });
    }

    // Simulate processing delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully!',
      data: {
        formIdentifier,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission. Please try again.',
    });
  }
}

