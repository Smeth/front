import S3FileUploader from '@components/elements/forms/S3FileUploader'
import Switcher from '@components/elements/forms/Switcher'
import { SaveIcon } from '@icons/MyTVIcons'
import Image from 'next/image'

const AdmobSettings = ({ config, handleFieldChange, errors }: any) => {
    return (
        <div className="">
            <p className="text-sm mb-6 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui voluptas ullam! In, quas? Inventore doloribus similique accusamus maiores ipsa, magnam distinctio officiis hic. Voluptate accusamus omnis cum facilis eligendi.</p>
            <div className="flex space-x-8">
                <div className="flex items-center space-x-4 mb-2">
                    <Switcher
                        name={"id"}
                        id={"id"}
                        checked={true}
                    />
                    <span className="text-white text-sm font-medium">AD Banner</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                    <Switcher
                        name={"id"}
                        id={"id2"}
                        checked={false}
                    />
                    <span className="text-white text-sm font-medium">AD interstitial</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="flex flex-col gap-4">
                    <p className="text-gray-400 text-xl font-medium">ANDROID</p>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="accessKey" className="text-white text-sm font-medium">AD App ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="accessKey" 
                                id="accessKey"
                                onChange={(e: any) => handleFieldChange('accessKey', e.target.value)}
                                value={config?.admob?.accessKey}
                            />
                            {errors && errors?.admob?.accessKey && <span className="text-red-500 text-sm">{errors.admob?.accessKey}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="secret" className="text-white text-sm font-medium">AD unit banner ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="secret" 
                                id="secret"
                                onChange={(e: any) => handleFieldChange('secret', e.target.value)}
                                value={config?.admob?.secret}
                            />
                            {errors && errors?.admob?.secret && <span className="text-red-500 text-sm">{errors.admob?.secret}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="secret" className="text-white text-sm font-medium">AD unit interstitial ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="secret" 
                                id="secret"
                                onChange={(e: any) => handleFieldChange('secret', e.target.value)}
                                value={config?.admob?.secret}
                            />
                            {errors && errors?.admob?.secret && <span className="text-red-500 text-sm">{errors.admob?.secret}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-gray-400 text-xl font-medium">IOS</p>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="accessKey" className="text-white text-sm font-medium">AD App ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="accessKey" 
                                id="accessKey"
                                onChange={(e: any) => handleFieldChange('accessKey', e.target.value)}
                                value={config?.admob?.accessKey}
                            />
                            {errors && errors?.admob?.accessKey && <span className="text-red-500 text-sm">{errors.admob?.accessKey}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="secret" className="text-white text-sm font-medium">AD unit banner ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="secret" 
                                id="secret"
                                onChange={(e: any) => handleFieldChange('secret', e.target.value)}
                                value={config?.admob?.secret}
                            />
                            {errors && errors?.admob?.secret && <span className="text-red-500 text-sm">{errors.admob?.secret}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="secret" className="text-white text-sm font-medium">AD unit interstitial ID</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="secret" 
                                id="secret"
                                onChange={(e: any) => handleFieldChange('secret', e.target.value)}
                                value={config?.admob?.secret}
                            />
                            {errors && errors?.admob?.secret && <span className="text-red-500 text-sm">{errors.admob?.secret}</span>}
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

export default AdmobSettings