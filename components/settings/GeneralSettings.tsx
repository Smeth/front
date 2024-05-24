import S3FileUploader from '@components/elements/forms/S3FileUploader'
import { SaveIcon } from '@icons/MyTVIcons'
import Image from 'next/image'

const GeneralSettings = ({ config, handleFieldChange, errors }: any) => {
    return (
        <div className="">
            <p className="text-sm mb-6 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui voluptas ullam! In, quas? Inventore doloribus similique accusamus maiores ipsa, magnam distinctio officiis hic. Voluptate accusamus omnis cum facilis eligendi.</p>
            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="appName" className="text-white text-sm font-medium">{"Nom de l'application"}</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="appName" 
                                id="appName"
                                onChange={(e: any) => handleFieldChange('appName', e.target.value)}
                                value={config?.general?.appName}
                            />
                            {errors && errors?.general?.appName && <span className="text-red-500 text-sm">{errors.general?.appName}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="playStoreUrl" className="text-white text-sm font-medium">URL PlayStore</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="playStoreUrl" 
                                id="playStoreUrl"
                                onChange={(e: any) => handleFieldChange('playStoreUrl', e.target.value)}
                                value={config?.general?.playStoreUrl}
                            />
                            {errors && errors?.general?.playStoreUrl && <span className="text-red-500 text-sm">{errors.general?.playStoreUrl}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="appStoreUrl" className="text-white text-sm font-medium">URL AppStore</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="appStoreUrl" 
                                id="appStoreUrl"
                                onChange={(e: any) => handleFieldChange('appStoreUrl', e.target.value)}
                                value={config?.general?.appStoreUrl}
                            />
                            {errors && errors?.general?.appStoreUrl && <span className="text-red-500 text-sm">{errors.general?.appStoreUrl}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="terms" className="text-white text-sm font-medium">Terms of services</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="terms" 
                                id="terms"
                                onChange={(e: any) => handleFieldChange('terms', e.target.value)}
                                value={config?.general?.terms}
                            />
                            {errors && errors?.general?.terms && <span className="text-red-500 text-sm">{errors.general?.terms}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center space-x-4">
                        <label htmlFor="policy" className="text-white text-sm font-medium">Politique de confidentialité</label>
                        <div className="w-full md:w-2/3 flex flex-col space-y-1">
                            <input 
                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                type="text" 
                                name="policy" 
                                id="policy"
                                onChange={(e: any) => handleFieldChange('policy', e.target.value)}
                                value={config?.general?.policy}
                            />
                            {errors && errors?.general?.policy && <span className="text-red-500 text-sm">{errors.general?.policy}</span>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between space-x-4">
                        <label htmlFor="logo" className="text-white text-sm font-medium mt-3">Logo du site*</label>
                        <div className="w-full md:w-2/3">
                            <S3FileUploader 
                                id="logo"
                                name="logo"
                                accept="image/*"
                                onFieldChange={handleFieldChange}
                                fileUrl={config?.logo || ''}
                            />
                            {errors && errors?.logo && <span className="text-red-500 text-sm">{errors.logo}</span>}
                            {
                                config?.logo && config?.logo !== "" && (
                                    <div className="h-20 mt-1 w-auto relative">
                                        <Image
                                            fill className="object-contain object-left"
                                            alt={"logo de " + config?.name}
                                            src={config?.logo}
                                            sizes="(100vw - 2.5rem)"
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <label htmlFor="logo" className="text-white text-sm font-medium mt-3">Mini logo*</label>
                        <div className="w-full md:w-2/3">
                            <S3FileUploader 
                                id="logo"
                                name="logo"
                                accept="image/*"
                                onFieldChange={handleFieldChange}
                                fileUrl={config?.logo || ''}
                            />
                            {errors && errors?.logo && <span className="text-red-500 text-sm">{errors.logo}</span>}
                            {
                                config?.logo && config?.logo !== "" && (
                                    <div className="h-20 mt-1 w-auto relative">
                                        <Image
                                            fill className="object-contain object-left"
                                            alt={"logo de " + config?.name}
                                            src={config?.logo}
                                            sizes="(100vw - 2.5rem)"
                                        />
                                    </div>
                                )
                            }
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

export default GeneralSettings