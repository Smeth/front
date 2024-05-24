"use client"

import CheckBox from "@components/elements/forms/CheckBox"
import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import Link from "next/link"

export default function AddUserPage() {
    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <Link href="/sliders" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <div className="mt-4 mb-8">
                    <div className="md:pr-20">
                        <div className="">
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Titre du slider*</label>
                                    <input 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        type="text" 
                                        name="title" 
                                        id="title"
                                    />
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium mt-3">Image du slider*</label>
                                    <div className="w-full md:w-2/3">
                                        <S3FileUploader 
                                            id="image"
                                            name="image"
                                            onFieldChange={() => {}}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Type de poste</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                    >
                                        <option value="active">Actif</option>
                                        <option value="inactive">Inactif</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Afficher...</label>
                                    <div className="w-full md:w-2/3 flex items-center space-x-4 py-3">
                                        <CheckBox
                                            name=""
                                            id=""
                                            checked={false}
                                            onChange={() => {}}
                                            label="Page d'accueil"
                                        />
                                        <CheckBox
                                            name=""
                                            id=""
                                            checked={false}
                                            onChange={() => {}}
                                            label="Page d'accueil"
                                        />
                                        <CheckBox
                                            name=""
                                            id=""
                                            checked={false}
                                            onChange={() => {}}
                                            label="Page d'accueil"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Statut</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                    >
                                        <option value="active">Actif</option>
                                        <option value="inactive">Inactif</option>
                                    </select>
                                </div>
                                <div className="flex justify-end">
                                    <button className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded">
                                        <SaveIcon classes="h-4 text-white" />
                                        <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
