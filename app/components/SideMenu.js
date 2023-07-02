import React, { useState } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { MdPhotoCamera } from 'react-icons/md'
import { MapData } from '../lib/database'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

const SideMenu = (props) => {

    const { selectedIds, onSelectedIdsChange } = props

    const [filterOptions, setFilterOptions] = useState('کد')
    const [selectedWay, setSelectedWay] = useState('')
    const [searchId, setSearchId] = useState('')
    const [showMenu, setShowMenu] = useState(false)

    const filteredData = selectedWay
    ? MapData.filter((item) => item.way === selectedWay)
    : searchId
    ? MapData.filter((item) => item.id === searchId)
    : MapData;

    const wayOptions = Array.from(new Set(MapData.map((item) => item.way)))

    const handleSelectChange = (e) => setSelectedWay(e.target.value)

    const handleCheckboxChange = (id) => {
        const newSelectedIds = selectedIds.includes(id)
          ? selectedIds.filter((selectedId) => selectedId !== id)
          : [...selectedIds, id];
        onSelectedIdsChange(newSelectedIds)
    }

    const handleReset = () => {
        onSelectedIdsChange([])
        setSearchId('')
    }

    return (
        <div className='relative'>
        <div className='fixed right-4 top-4 z-[100]'>
            {!showMenu ?
            
            <GiHamburgerMenu 
                className='text-4xl text-black cursor-pointer transition-all hover:text-gray-700'
                onClick={(e) => setShowMenu(true)}
            /> 
            :
            <AiOutlineClose 
                className='text-4xl text-black cursor-pointer transition-all hover:text-gray-700'
                onClick={(e) => setShowMenu(false)}

            /> 

            }
        </div>
        <div className={`w-[25rem] h-full flex flex-col justify-between fixed text-base top-0 ${showMenu? 'right-0':'right-[-400px]'}  bg-white bg-opacity-60 overflow-hidden shadow-lg transition-all pt-20 p-8 z-50`}>

            <div>
                <label htmlFor="filter" className="text-[#4a4a49] text-lg mb-2 font-bold">فیلتر بر اساس</label>
                <select
                    id="filter"
                    className="bg-[#9f5b72] min-h-[2rem] text-white w-full text-base border-none outline-none rounded-md mb-[0.3rem] shadow-lg"
                    onChange={(e) => {
                        setFilterOptions(e.target.value)
                        if(e.target.value === 'کد') {

                        }
                    }}
                    defaultValue={'کد'}
                >
                    <option value={'کد'}>کد</option>
                    <option value={'مسیر'}>مسیر</option>
                </select>
                {filterOptions === 'مسیر' ?
                    <>
                        <label htmlFor="ways" className="text-[#4a4a49] text-lg mb-2 font-bold" id="ways-label">انتخاب مسیر</label>
                        <select
                            id="ways" 
                            className="bg-[#9f5b72] min-h-[2rem] text-white w-full text-base border-none outline-none rounded-md mb-[0.3rem] shadow-lg"
                            value={selectedWay}
                            onChange={handleSelectChange}
                        >
                            <option value="همه مسیر ها">همه مسیر ها</option>
                            {wayOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                                ))}
                        </select>
                    </>
                    :
                    <>
                        <div className="w-full flex mt-4 items-center gap-2">
                            <input
                                id="code"
                                className="bg-[#9f5b72] inline min-h-[2rem] text-white border-none outline-none w-full rounded-md pr-1 shadow-lg"
                                placeholder="کد بیلبورد را وارد کنید"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                        </div>
                    </>  
                        }
            </div>

            <div className="w-full mt-4 mb-2 flex-grow overflow-y-auto" id="result">
                <ul className='text-black'>
                    {filteredData.map(({ id, way, address }) => (
                    <li key={id} className='flex items-center text-sm gap-2'>
                        <input 
                            type='checkbox' 
                            id={id}
                            checked={selectedIds.includes(id)}
                            onChange={() => handleCheckboxChange(id)}
                        />
                        <p>{`${way}, ${address}`}</p>
                    </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-1 ">
                <button 
                    id="reset-btn" 
                    className="flex items-center justify-center flex-grow-0 bg-[#9f5b72] text-white h-8 rounded-md border-none outline-none shadow-lg transition-all cursor-pointer px-4 hover:bg-[#4a4a49]"
                    onClick={handleReset}
                >
                    <IoMdRefresh/>
                </button>

                <button 
                    id="finish-btn" 
                    className="flex items-center justify-center flex-grow bg-[#9f5b72] text-white h-8 rounded-md border-none outline-none shadow-lg transition-all cursor-pointer hover:bg-[#4a4a49]"
                >
                    اتمام جستجو
                </button>
                <button 
                    id="sc-btn" 
                    className="flex-grow-0 bg-[#9f5b72] text-white h-8 rounded-md border-none outline-none shadow-lg transition-all cursor-pointer px-4 hover:bg-[#4a4a49]"
                >
                    <MdPhotoCamera/>
                </button>
            </div>
        </div>
        </div>
    )
    }

export default SideMenu