import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fileToBase64 } from '../utils/imageUtils';
import { FadeIn } from './animations/FadeIn';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const uploadSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters long"),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Image is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface UploadProductFormProps {
  onProductReady: (data: { name: string; imageBase64: string }) => void;
}

export const UploadProductForm: React.FC<UploadProductFormProps> = ({ onProductReady }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = async (data: UploadFormData) => {
    try {
      const file = data.image[0];
      const base64 = await fileToBase64(file);
      onProductReady({ name: data.productName, imageBase64: base64 });
      reset();
      setPreview(null);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setValue("image", e.dataTransfer.files as unknown as FileList, { shouldValidate: true });
      const file = e.dataTransfer.files[0];
      if (file) {
          const objectUrl = URL.createObjectURL(file);
          setPreview(objectUrl);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const objectUrl = URL.createObjectURL(e.target.files[0]);
          setPreview(objectUrl);
      }
  };

  return (
    <FadeIn direction="up">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Style Your Own Product</h3>
            <p className="text-slate-500 mt-2 text-sm">Upload an image and let our AI do the styling.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Product Name Input */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium leading-6 text-slate-900">
              Product Name
            </label>
            <div className="mt-2">
              <input
                {...register("productName")}
                type="text"
                id="productName"
                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-shadow"
                placeholder="e.g., Vintage Denim Jacket"
              />
            </div>
            {errors.productName && (
              <p className="mt-2 text-sm text-red-600">{errors.productName.message}</p>
            )}
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
              Product Image
            </label>
            
            <div
              className={`relative flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors ${
                isDragging 
                  ? "border-indigo-600 bg-indigo-50" 
                  : "border-slate-300 hover:bg-slate-50"
              } ${errors.image ? "border-red-300 bg-red-50" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                {preview ? (
                   <div className="relative inline-block">
                        <img src={preview} alt="Preview" className="max-h-48 rounded-md shadow-md" />
                        <button 
                            type="button" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setPreview(null);
                                setValue("image", null as unknown as FileList);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                             </svg>
                        </button>
                   </div>
                ) : (
                    <>
                        <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Upload a file</span>
                            <input
                            {...register("image", { onChange: handleFileChange })}
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 5MB</p>
                    </>
                )}
              </div>
            </div>
             {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
             )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-slate-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                </span>
            ) : "Start Styling"}
          </button>
        </form>
      </div>
    </FadeIn>
  );
};
