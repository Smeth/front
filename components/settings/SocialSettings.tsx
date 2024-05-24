import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { SaveIcon } from "@icons/MyTVIcons"
import Image from 'next/image'

const SocialSettings = ({ config, handleFieldChange, errors }: any) => {
    return (
        <div className="">
            <p className="text-sm mb-6 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui voluptas ullam! In, quas? Inventore doloribus similique accusamus maiores ipsa, magnam distinctio officiis hic. Voluptate accusamus omnis cum facilis eligendi.</p>
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="facebook" className="text-white text-sm font-medium">Facebook</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="facebook" 
                                id="facebook"
                                onChange={(e: any) => handleFieldChange('facebook', e.target.value)}
                                value={config?.social?.facebook}
                            />
                            {errors && errors?.social?.facebook && <span className="text-red-500 text-sm">{errors.social?.facebook}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="instagram" className="text-white text-sm font-medium">Instagram</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="instagram" 
                                id="instagram"
                                onChange={(e: any) => handleFieldChange('instagram', e.target.value)}
                                value={config?.social?.instagram}
                            />
                            {errors && errors?.social?.instagram && <span className="text-red-500 text-sm">{errors.social?.instagram}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="youtube" className="text-white text-sm font-medium">Youtube</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="youtube" 
                                id="youtube"
                                onChange={(e: any) => handleFieldChange('youtube', e.target.value)}
                                value={config?.social?.youtube}
                            />
                            {errors && errors?.social?.youtube && <span className="text-red-500 text-sm">{errors.social?.youtube}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="twitter" className="text-white text-sm font-medium">Twitter / X</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="twitter" 
                                id="twitter"
                                onChange={(e: any) => handleFieldChange('twitter', e.target.value)}
                                value={config?.social?.twitter}
                            />
                            {errors && errors?.social?.twitter && <span className="text-red-500 text-sm">{errors.social?.twitter}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <button className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded">
                    <SaveIcon classes="h-4 text-white" />
                    <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                </button>
            </div>
        </div>
    )
}

export default SocialSettings