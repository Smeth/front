"use client"

import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { AdsIcon, SaveIcon } from "@icons/MyTVIcons"
import { useState } from "react"
import Image from 'next/image'
import SocialSettings from "@components/settings/SocialSettings"
import AmazonWSSettings from "@components/settings/AmazonWSSettings"
import ThemeSettings from "@components/settings/ThemeSettings"
import TMDBSettings from "@components/settings/TMDBSettings"
import AdmobSettings from "@components/settings/AdmobSettings"
import FirebaseSettings from "@components/settings/FirebaseSettings"
import GeneralSettings from "@components/settings/GeneralSettings"

export default function SettingsPage() {
    const [errors, setErrors] = useState<any>(null)
    const [config, setConfig] = useState<any>({})
    const [currentTab, setCurrentTab] = useState<string>("general")

    const handleFieldChange = (fieldName: string, value: string) => {
        setConfig({
            ...config,
            [fieldName]: value
        })
    }
    return (
        <div className="w-full  ">
            <div className="w-full bg-dark-800 rounded p-5">
                <div className="mt-1">
                    <div className="flex space-x-2 bg-dark-500 p-1.5 rounded-md">
                        <button onClick={() => setCurrentTab("general")} className={(currentTab === 'general' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">Général</span>
                        </button>
                        <button onClick={() => setCurrentTab("firebase")} className={(currentTab === 'firebase' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">Firebase</span>
                        </button>
                        <button onClick={() => setCurrentTab("admob")} className={(currentTab === 'admob' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">Admob</span>
                        </button>
                        <button onClick={() => setCurrentTab("themoviedb")} className={(currentTab === 'themoviedb' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">TheMovieDB</span>
                        </button>
                        <button onClick={() => setCurrentTab("amazonws")} className={(currentTab === 'amazonws' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">Amazon Web Services</span>
                        </button>
                        <button onClick={() => setCurrentTab("theme")} className={(currentTab === 'theme' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">Theme</span>
                        </button>
                        <button onClick={() => setCurrentTab("social")} className={(currentTab === 'social' ? 'bg-primary-900 shadow-md text-white' : 'text-gray-200 hover:bg-primary-700/5') +  " px-12 py-2 rounded-md border border-transparent focus:outline-none hover:border-primary-900/25 "}>
                            <span className="font-medium">Social</span>
                        </button>
                    </div>
                    <div className="border border-dark-500 p-4 mt-2">
                        {currentTab === 'general' && <GeneralSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                        {currentTab === 'firebase' && <FirebaseSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                        {currentTab === 'admob' && <AdmobSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                        {currentTab === 'themoviedb' && <TMDBSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                        {currentTab === 'amazonws' && <AmazonWSSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                        {currentTab === 'theme' && <ThemeSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                        {currentTab === 'social' && <SocialSettings config={config} handleFieldChange={handleFieldChange} errors={errors} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
