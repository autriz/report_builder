import type { RequestHandler } from '@sveltejs/kit';
import FileService from '../../../lib/server/service/file';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();

        if (!Array.isArray(data)) {
            return new Response('Invalid data format, expected an array of objects', { status: 400 });
        }

        const fileService = new FileService();

        let now = new Date();
        const outputFilePath = `Report ${now.toISOString().replace(/[:]/g, '-').replace(/[T]/g, ' ').split('.')[0]}.docx`;
        
        fileService.generateDOCX(data, outputFilePath);

        return new Response(JSON.stringify({ message: 'DOCX file generated successfully', filePath: outputFilePath }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error generating DOCX file:', error);
        return new Response('Failed to generate DOCX file', { status: 500 });
    }
};
