import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { SaveIcon } from "@icons/MyTVIcons"
import Image from 'next/image'

const TMDBSettings = ({ config, handleFieldChange, errors }: any) => {
    return (
        <div className="">
            <p className="text-sm mb-6 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui voluptas ullam! In, quas? Inventore doloribus similique accusamus maiores ipsa, magnam distinctio officiis hic. Voluptate accusamus omnis cum facilis eligendi.</p>
            <div className="grid grid-cols-2 gap-8">
                <div className="flex justify-between items-center space-x-4">
                    <label htmlFor="apiKey" className="text-white text-sm font-medium">API Key</label>
                    <div className="w-full flex-1 flex flex-col space-y-1">
                        <input 
                            className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                            type="text" 
                            name="apiKey" 
                            id="apiKey"
                            onChange={(e: any) => handleFieldChange('apiKey', e.target.value)}
                            value={config?.tmdb?.apiKey}
                        />
                        {errors && errors?.tmdb?.apiKey && <span className="text-red-500 text-sm">{errors.tmdb?.apiKey}</span>}
                    </div>
                </div>
                <div className="flex justify-between items-center space-x-4">
                    <label htmlFor="langue" className="text-white text-sm font-medium">Langue</label>
                    <select 
                        className="w-full flex-1 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                        name="langue" 
                        id="langue"
                        onChange={(e: any) => handleFieldChange('langue', e.target.value)}
                    >
                        <option value="1">Français</option>
                        <option value="2">Anglais</option>
                    </select>
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


export default TMDBSettings