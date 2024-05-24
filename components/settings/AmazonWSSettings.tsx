import S3FileUploader from "@components/elements/forms/S3FileUploader"
import Switcher from "@components/elements/forms/Switcher"
import { SaveIcon } from "@icons/MyTVIcons"
import Image from 'next/image'

const AmazonWSSettings = ({ config, handleFieldChange, errors }: any) => {
    return (
        <div className="">
            <p className="text-sm mb-6 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui voluptas ullam! In, quas? Inventore doloribus similique accusamus maiores ipsa, magnam distinctio officiis hic. Voluptate accusamus omnis cum facilis eligendi.</p>
            <div className="flex items-center space-x-4 mb-2">
                <Switcher
                    name={"id"}
                    id={"id"}
                    checked={false}
                />
                <span className="text-white text-sm font-medium">AWS S3 Storage</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="accessKey" className="text-white text-sm font-medium">Access Key ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="accessKey" 
                                id="accessKey"
                                onChange={(e: any) => handleFieldChange('accessKey', e.target.value)}
                                value={config?.amazonws?.accessKey}
                            />
                            {errors && errors?.amazonws?.accessKey && <span className="text-red-500 text-sm">{errors.amazonws?.accessKey}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="secret" className="text-white text-sm font-medium">Secret Access Key</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="secret" 
                                id="secret"
                                onChange={(e: any) => handleFieldChange('secret', e.target.value)}
                                value={config?.amazonws?.secret}
                            />
                            {errors && errors?.amazonws?.secret && <span className="text-red-500 text-sm">{errors.amazonws?.secret}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="region" className="text-white text-sm font-medium">Default region</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="region" 
                                id="region"
                                onChange={(e: any) => handleFieldChange('region', e.target.value)}
                                value={config?.amazonws?.region}
                            />
                            {errors && errors?.amazonws?.region && <span className="text-red-500 text-sm">{errors.amazonws?.region}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="bucket" className="text-white text-sm font-medium">Bucket</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="bucket" 
                                id="bucket"
                                onChange={(e: any) => handleFieldChange('bucket', e.target.value)}
                                value={config?.amazonws?.bucket}
                            />
                            {errors && errors?.amazonws?.bucket && <span className="text-red-500 text-sm">{errors.amazonws?.bucket}</span>}
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

export default AmazonWSSettings