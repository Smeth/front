"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
import SwitchRadio from "@components/elements/forms/SwitchRadio"
import TinyEditor from "@components/elements/forms/TinyEditor"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import Link from "next/link"

export default function AddMovie() {
    return (
        <div className="w-full  ">
            <div className="w-full bg-dark-800 rounded p-5">
                <div className="mt-4">
                    <div className="md:w-7/12 my-3">
                        <div className="">
                            <h2 className="text-lg text-white font-medium">Options du lecteur</h2>
                            <div className="mt-8 flex flex-col gap-4">
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Style du lecteur</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                    >
                                        <option value="active">Classique</option>
                                        <option value="inactive">Metal</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Icones vectorielles</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                    >
                                        <option value="active">OUI</option>
                                        <option value="inactive">NON</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Autoplay</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                    >
                                        <option value="active">OUI</option>
                                        <option value="inactive">NON</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center space-x-4">
                                    <label htmlFor="title" className="text-white text-sm font-medium">Rembobiner et avancer</label>
                                    <select 
                                        className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                        name="status" 
                                        id="status"
                                    >
                                        <option value="active">OUI</option>
                                        <option value="inactive">NON</option>
                                    </select>
                                </div>
                            </div>
                            <div className="border-t border-dark-500 mt-4 pt-4">
                                <h2 className="text-lg text-white font-medium">Filigrane du lecteur</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="title" className="text-white text-sm font-medium">Icones vectorielles</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="status" 
                                            id="status"
                                        >
                                            <option value="active">OUI</option>
                                            <option value="inactive">NON</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="movie_thumbnail" className="text-white text-sm font-medium mt-3">Movie Thumbnail*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader
                                                name="movie_thumbnail"
                                                id="movie_thumbnail"
                                                onFieldChange={() => null}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="title" className="text-white text-sm font-medium">Position du logo</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="status" 
                                            id="status"
                                        >
                                            <option value="active">Gauche</option>
                                            <option value="inactive">Droite</option>
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
        </div>
    )
}
