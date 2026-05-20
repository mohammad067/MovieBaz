import { useState } from 'react';
import { Listbox, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const sortOptions = [
  { id: 'relevance', label: 'مرتبط‌ترین' },
  { id: 'newest', label: 'جدیدترین' },
  { id: 'oldest', label: 'قدیمی‌ترین' },
  { id: 'rating', label: 'بالاترین امتیاز' },
  { id: 'popular', label: 'محبوب‌ترین' },
];

const types = [
  { id: 'all', label: 'همه' },
  { id: 'movie', label: 'فیلم' },
  { id: 'tv', label: 'سریال' },
];

 function SearchFilters({ onFilterChange, query }) {
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [type, setType] = useState(types[0]);
  const [year, setYear] = useState('');

  const handleChange = (newSort, newType, newYear) => {
    onFilterChange({
      query,
      sortBy: newSort.id,
      type: newType.id,
      year: newYear,
    });
  };

  return (
    <div className="flex flex-wrap gap-3 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 mb-8 sticky top-0 z-50">
      
      {/* جستجو (اختیاری - چون از Navbar میاد) */}
      <div className="relative flex-1 min-w-[240px]">
        <div className="bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white flex items-center">
          <span className="text-green-500 mr-3">🔍</span>
          {query || "نتایج جستجو"}
        </div>
      </div>

      {/* نوع محتوا */}
      <Listbox value={type} onChange={(newType) => {
        setType(newType);
        handleChange(sortBy, newType, year);
      }}>
        <div className="relative w-40">
          <Listbox.Button className="w-full bg-slate-900 border border-slate-600 hover:border-slate-500 rounded-xl px-5 py-3 flex items-center justify-between">
            {type.label}
            <ChevronDownIcon className="w-5 h-5" />
          </Listbox.Button>
          <Transition>
            <Listbox.Options className="absolute mt-2 w-full bg-slate-800 border border-slate-700 rounded-2xl py-2 shadow-2xl z-50">
              {types.map((t) => (
                <Listbox.Option key={t.id} value={t} className="px-5 py-2 hover:bg-slate-700 cursor-pointer">
                  {t.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* مرتب‌سازی */}
      <Listbox value={sortBy} onChange={(newSort) => {
        setSortBy(newSort);
        handleChange(newSort, type, year);
      }}>
        <div className="relative w-48">
          <Listbox.Button className="w-full bg-slate-900 border border-slate-600 hover:border-slate-500 rounded-xl px-5 py-3 flex items-center justify-between">
            {sortBy.label}
            <ChevronDownIcon className="w-5 h-5" />
          </Listbox.Button>
          <Transition>
            <Listbox.Options className="absolute mt-2 w-full bg-slate-800 border border-slate-700 rounded-2xl py-2 shadow-2xl z-50">
              {sortOptions.map((option) => (
                <Listbox.Option key={option.id} value={option} className="px-5 py-2 hover:bg-slate-700 cursor-pointer">
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* سال */}
      <div className="relative w-36">
        <input
          type="number"
          placeholder="سال"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            handleChange(sortBy, type, e.target.value);
          }}
          className="w-full bg-slate-900 border border-slate-600 hover:border-slate-500 rounded-xl px-5 py-3 focus:outline-none"
        />
      </div>

    </div>
  );
}
export default SearchFilters;