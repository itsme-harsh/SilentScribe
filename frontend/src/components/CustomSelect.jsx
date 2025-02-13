import { useState } from "react";

const people = [
  {
    id: 1,
    name: "Cooking",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Computer Science",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // Add more people here
];

export default function CustomSelect() {
  const [selected, setSelected] = useState(people[0]); // Default selected person
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full relative">
      <label id="listbox-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Assigned to
      </label>
      <div className="relative mt-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="listbox-label"
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img src={selected.image} alt={selected.name} className="size-5 shrink-0 rounded-full" />
            <span className="block truncate">{selected.name}</span>
          </span>
          <svg
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {people.map((person) => (
              <li
                key={person.id}
                onClick={() => {
                  setSelected(person);
                  setIsOpen(false);
                }}
                className={`relative cursor-pointer py-2 pr-9 pl-3 select-none ${
                  selected.id === person.id ? "bg-indigo-600 text-white" : "text-gray-900"
                }`}
                role="option"
              >
                <div className="flex items-center">
                  <img src={person.image} alt={person.name} className="size-5 shrink-0 rounded-full" />
                  <span className={`ml-3 block truncate ${selected.id === person.id ? "font-semibold" : "font-normal"}`}>
                    {person.name}
                  </span>
                </div>
                {selected.id === person.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
