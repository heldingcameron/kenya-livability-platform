import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    label?: string;
    disabled?: boolean;
}

export const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    error,
    label,
    disabled = false,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
            } else {
                const currentIndex = options.findIndex((opt) => opt.value === value);
                const nextIndex = Math.min(currentIndex + 1, options.length - 1);
                onChange(options[nextIndex].value);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (isOpen) {
                const currentIndex = options.findIndex((opt) => opt.value === value);
                const prevIndex = Math.max(currentIndex - 1, 0);
                onChange(options[prevIndex].value);
            }
        }
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-body-sm font-medium text-slate-700 mb-2">
                    {label}
                </label>
            )}
            <div ref={dropdownRef} className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className={`
                        w-full px-4 py-3 text-left bg-white border rounded-lg
                        flex items-center justify-between
                        transition-all duration-200
                        ${error ? 'border-critical focus:ring-critical/20' : 'border-slate-300 focus:ring-primary/20'}
                        ${disabled ? 'bg-slate-50 cursor-not-allowed opacity-60' : 'hover:border-slate-400 focus:outline-none focus:ring-4'}
                        ${isOpen ? 'border-primary ring-4 ring-primary/20' : ''}
                    `}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className={selectedOption ? 'text-slate-900' : 'text-slate-500'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                            }`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-level-3 max-h-60 overflow-auto"
                        role="listbox"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full px-4 py-3 text-left transition-colors
                                    ${option.value === value
                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                        : 'text-slate-900 hover:bg-slate-50'
                                    }
                                `}
                                role="option"
                                aria-selected={option.value === value}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {error && <p className="mt-2 text-body-sm text-critical">{error}</p>}
        </div>
    );
};
