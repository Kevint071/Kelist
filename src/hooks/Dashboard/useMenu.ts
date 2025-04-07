import { useState, useEffect, useRef } from 'react';

export const useMenu = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (menuOpen) {
      const button = document.querySelector(`[data-menu-id="${menuOpen}"]`);
      const menu = document.querySelector(`[data-menu-content="${menuOpen}"]`) as HTMLElement | null;
      if (button && menu) {
        const rect = button.getBoundingClientRect();
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.left = `${rect.right - menu.clientWidth}px`;
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const button = document.querySelector(`[data-menu-id="${menuOpen}"]`);
        if (!button?.contains(event.target as Node)) {
          setMenuOpen(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return { menuOpen, setMenuOpen, menuRef };
};