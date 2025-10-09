"use client"

import Image from 'next/image'
import { expenseCategories, incomeCategories } from '../store/CategoryStore'
import { Category } from '../model'
import { useEffect, useRef, useState } from 'react'

export default function Sidebar() {
    const expenses: Category[]  = expenseCategories
    const incomes: Category[] = incomeCategories
    const [showLabel, setShowLabel] = useState<number | null>(null)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])


    return (
        <>  
            <div className="hidden lg:block lg:w-[250px] h-full md:bg-[#FBFDFF] flex-col items-center fixed left-0 top-0">
                <Image src="/logo.png" alt="Logo" width={430} height={430} className='absolute top-[-100px] left-[-20px]' />
                <div className='absolute top-[100px] flex flex-col pl-4'>
                    <ul className='flex flex-col gap-y-[25px] mb-8'>
                        <li className='w-[200px] pl-[8px] pr-[4px] py-[4px] flex items-center cursor-pointer hover:bg-[#CFF0E7] hover:rounded-[10px]'>
                            <Image src="/home.png" alt="Home Icon" width={36} height={36} className='mr-2' />
                            <div className='text-[19px] font-bold'>Home</div>
                        </li>
                        <li className='w-[200px] pl-[8px] pr-[4px] py-[4px] flex items-center cursor-pointer hover:bg-[#CFF0E7] hover:rounded-[10px]'>
                            <Image src="/category.png" alt="Category Icon" width={36} height={36} className='mr-2' />
                            <div className='text-[19px] font-bold'>Category</div>
                        </li>
                        <li className='w-[200px] pl-[8px] pr-[4px] py-[4px] flex items-center cursor-pointer hover:bg-[#CFF0E7] hover:rounded-[10px]'>
                            <Image src="/calendar.png" alt="Scheduler Icon" width={36} height={36} className='mr-2' />
                            <div className='text-[19px] font-bold'>Scheduler</div>
                        </li>
                        <li className='w-[200px] pl-[8px] pr-[4px] py-[4px] flex items-center cursor-pointer hover:bg-[#CFF0E7] hover:rounded-[10px]'>
                            <Image src="/chart.png" alt="Report Icon" width={36} height={36} className='mr-2' />
                            <div className='text-[19px] font-bold'>Report</div>
                        </li>
                    </ul>
                    <div className='flex flex-col gap-y-2.5 mb-4'>
                        <div className='text-[26px] font-bold pl-2'>Expense</div>
                        <ul className='flex flex-col gap-y-[25px] h-[200px] overflow-y-auto'>
                            {expenses.map((category) => (
                                <li key={category.id} className='w-[200px] pl-[8px] pr-[4px] py-[4px] flex items-center cursor-pointer hover:bg-[#CFF0E7] hover:rounded-[10px]'>
                                    <Image src={category.icon} alt="Money Icon" width={36} height={36} className='mr-2' />
                                    <div className='text-[19px] font-bold'>{category.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col gap-y-2.5'>
                        <div className='text-[26px] font-bold pl-2'>Income</div>
                        <ul className='flex flex-col gap-y-[25px] h-[200px] overflow-y-auto'>
                            {incomes.map((category) => (
                                <li key={category.id} className='w-[200px] pl-[8px] pr-[4px] py-[4px] flex items-center cursor-pointer hover:bg-[#CFF0E7] hover:rounded-[10px]'>
                                    <Image src={category.icon} alt="Money Icon" width={36} height={36} className='mr-2' />
                                    <div className='text-[19px] font-bold'>{category.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex justify-center'>
                        <button className='w-[150px] h-[60px] bg-[rgba(235,106,99,0.91)] hover:bg-[rgba(235,106,99,1)] cursor-pointer rounded-[20px] text-white font-semibold text-[20px]'>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
            <div className='lg:hidden w-full h-[70px] flex items-center justify-between relative'>
                <Image src="/logo.png" alt="Logo" width={200} height={200} className='cursor-pointer absolute top-[-85px] left-[-60px]' />
                <ul className='absolute right-[40px] flex gap-x-[10px] md:gap-x-[20px] items-center'>
                    <li 
                        key={1} className='size-[40px] md:size-[50px] flex items-center justify-center cursor-pointer bg-[rgba(226,229,233,0.5)] hover:bg-[rgba(226,229,233,0.8)] rounded-full relative'
                        onMouseEnter={() => {
                            setTimeout(() => setShowLabel(1), 100)
                        }}
                        onMouseLeave={() => {
                            setTimeout(() => setShowLabel(null), 100)
                        }}
                    >
                        <Image src="/category.png" alt="Category Icon" width={24} height={24} className='size-[24px] md:size-[28px]' />
                        {showLabel === 1 && (
                            <div className='absolute top-[65px] w-[65px] flex items-center justify-center text-[11px] font-semibold bg-[#080809] text-white py-1.5 px-2 rounded-[25px]'>
                                Category
                            </div>
                        )}
                    </li>
                    <li 
                        key={2} className='size-[40px] md:size-[50px] flex items-center justify-center cursor-pointer bg-[rgba(226,229,233,0.5)] hover:bg-[rgba(226,229,233,0.8)] rounded-full relative'
                        onMouseEnter={() => {
                            setTimeout(() => setShowLabel(2), 100)
                        }}
                        onMouseLeave={() => {
                            setTimeout(() => setShowLabel(null), 100)
                        }}
                    >
                        <Image src="/calendar.png" alt="Scheduler Icon" width={24} height={24} className='size-[24px] md:size-[28px]' />
                        {showLabel === 2 && (
                            <div className='absolute top-[65px] w-[65px] flex items-center justify-center text-[11px] font-semibold bg-[#080809] text-white py-1.5 px-2 rounded-[25px]'>
                                Schedule
                            </div>
                        )}
                    </li>
                    <li 
                        key={3} className='size-[40px] md:size-[50px] flex items-center justify-center cursor-pointer bg-[rgba(226,229,233,0.5)] hover:bg-[rgba(226,229,233,0.8)] rounded-full relative'
                        onMouseEnter={() => {
                            setTimeout(() => setShowLabel(3), 100)
                        }}
                        onMouseLeave={() => {
                            setTimeout(() => setShowLabel(null), 100)
                        }}
                    >
                        <Image src="/chart.png" alt="Report Icon" width={24} height={24} className='size-[24px] md:size-[28px]' />
                        {showLabel === 3 && (
                            <div className='absolute top-[65px] w-[65px] flex items-center justify-center text-[11px] font-semibold bg-[#080809] text-white py-1.5 px-2 rounded-[25px]'>
                                Report
                            </div>
                        )}
                    </li>
                    <div ref={menuRef} className='relative'>
                        <li 
                            key={4} className='size-[40px] md:size-[50px] flex items-center justify-center cursor-pointer bg-[rgba(226,229,233,0.5)] rounded-full border relative'
                            onMouseEnter={() => {
                                setTimeout(() => setShowLabel(4), 100)
                            }}
                            onMouseLeave={() => {
                                setTimeout(() => setShowLabel(null), 100)
                            }}
                            onClick={() => {
                                setTimeout(() => setShowLabel(null), 500)
                                setShowProfileMenu(!showProfileMenu)
                            }}
                        >
                            {showLabel === 4 && (
                                <div className='absolute top-[65px] w-[65px] flex items-center justify-center text-[11px] font-semibold bg-[#080809] text-white py-1.5 px-2 rounded-[25px] z-[11]'>
                                    Account
                                </div>
                            )}
                        </li>
                        {showProfileMenu && (
                            <div className='absolute top-[60px] right-0 w-[320px] md:w-[360px] h-[100px] bg-[#ffffff] shadow-md rounded-[15px] z-10'>
                                <div className='p-4'>
                                    <div className='flex items-center cursor-pointer hover:bg-[rgba(226,229,233,0.3)] rounded-[10px] p-2'>
                                        <div className='size-[36px] flex items-center justify-center bg-[#e2e5e9] rounded-full'>
                                            <Image src="/logout.png" alt="User Icon" width={20} height={20} className='size-[20px]' />
                                        </div>
                                        <div className='ml-4 text-[18px] font-semibold'>
                                            Log Out
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
        </>
    )
}
