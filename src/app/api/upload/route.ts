// api/upload/route.ts
import cloudinary from '@/app/lib/cloudinary'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    try {
      const data = await req.formData()
      const file = data.get('file') as File
  
      console.log({
        cloud: cloudinary.config().cloud_name,
        apiKey: cloudinary.config().api_key,
        apiSecret: Boolean(cloudinary.config().api_secret),
      })
  
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }
  
      console.log('File received:', file.name, file.size)
  
      const buffer = Buffer.from(await file.arrayBuffer())
      const base64String = `data:${file.type};base64,${buffer.toString('base64')}`
  
      const result = await cloudinary.uploader.upload(base64String, {
        folder: 'portfolio',
        resource_type: 'auto',
      })
  
      console.log('Upload successful:', {
        secure_url: result.secure_url,
        public_id: result.public_id,
      })
  
      return NextResponse.json({
        secure_url: result.secure_url,
        public_id: result.public_id,
      })
  
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Upload error:', {
          message: err.message,
          name: err.name,
          http_code: (err as { http_code?: number }).http_code, 
        })
        
        return NextResponse.json(
          { 
            error: 'Failed to upload image',
            details: err.message || 'Unknown error',
          }, 
          { status: 500 }
        )
      } else {
        console.error('Unknown error:', err)
        return NextResponse.json(
          { 
            error: 'Failed to upload image',
            details: 'Unknown error',
          }, 
          { status: 500 }
        )
      }
    }
  }