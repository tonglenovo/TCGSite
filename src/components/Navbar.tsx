import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Layers3,
  NotebookPen,
  Swords,
  Images,
  Mail,
  Menu,
  X,
} from 'lucide-react'

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  {
    name: 'TCG',
    path: '/tcg',
    icon: Layers3,
  },
  {
    name: 'Journal',
    path: '/journal',
    icon: NotebookPen,
  },
  {
    name: 'Matches',
    path: '/matches',
    icon: Swords,
  },
  {
    name: 'Life',
    path: '/life',
    icon: Images,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: Mail,
  },
]

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav
        className="
          w-full
          border-b border-purple-200
          bg-linear-to-r
          from-purple-200
          via-purple-50
          to-blue-200
        "
      >
        <div
          className="
            flex h-20 w-full
            items-center justify-between
            px-6 md:px-10
          "
        >
          {/* =============================================
              LOGO
          ============================================= */}

          <Link
            to="/"
            className="flex items-center gap-3 text-gray-900"
          >
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-purple-600
                font-bold text-white
              "
            >
              YT
            </div>

            <span className="text-xl font-bold">
              TongYT
            </span>
          </Link>

          {/* =============================================
              DESKTOP NAVIGATION
          ============================================= */}

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="
                    group relative
                    flex items-center gap-2
                    py-2
                    font-medium text-gray-700
                    transition-colors duration-200
                    hover:text-purple-600
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className="
                      transition-transform duration-200
                      group-hover:-translate-y-0.5
                    "
                  />

                  <span>
                    {item.name}
                  </span>

                  {/* Hover Underline */}

                  <span
                    className="
                      absolute bottom-0 left-0
                      h-0.5 w-0
                      bg-purple-600
                      transition-all duration-300
                      group-hover:w-full
                    "
                  />
                </Link>
              )
            })}
          </div>

          {/* =============================================
              MOBILE MENU BUTTON
          ============================================= */}

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              text-gray-700
              transition-colors
              hover:bg-purple-100
              md:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`
          fixed inset-0 z-40
          bg-black/40
          transition-opacity duration-300
          md:hidden
          ${
            isMenuOpen
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          }
        `}
      />

      {/* =================================================
          MOBILE SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed right-0 top-0 z-50
          h-full w-72
          bg-white
          shadow-xl
          transition-transform
          duration-300
          ease-in-out
          md:hidden
          ${
            isMenuOpen
              ? 'translate-x-0'
              : 'translate-x-full'
          }
        `}
      >
        {/* =============================================
            SIDEBAR HEADER
        ============================================= */}

        <div
          className="
            flex h-20
            items-center justify-between
            border-b border-gray-200
            px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-purple-600
                text-sm font-bold
                text-white
              "
            >
              YT
            </div>

            <span className="text-lg font-bold text-gray-900">
              Menu
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              text-gray-700
              transition-colors
              hover:bg-gray-100
            "
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* =============================================
            SIDEBAR NAVIGATION
        ============================================= */}

        <div className="flex flex-col p-4">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="
                  group
                  flex items-center gap-4
                  rounded-lg
                  px-4 py-4
                  font-medium text-gray-700
                  transition-colors duration-200
                  hover:bg-purple-50
                  hover:text-purple-600
                "
              >
                <Icon
                  size={22}
                  strokeWidth={2}
                  className="
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                />

                <span>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}

export default Navbar