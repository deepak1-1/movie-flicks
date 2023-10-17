import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CloseOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons'

import logo from '../../assets/movieflicks-logo.svg'
import { ContentWrapper } from '../../styled'
import './styles.scss'

const Header = () => {
   const navigate = useNavigate()
   const location = useLocation()

   const [show, setShow] = useState('top')
   const [lastScrollY, setLastScrollY] = useState(0)
   const [showMenu, setShowMenu] = useState(false)
   const [showSearchInput, setShowSearchInput] = useState(false)
   const [query, setQuery] = useState('')

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [location])

   useEffect(() => {
      window.addEventListener('scroll', controlNavbar)
      return () => {
         window.removeEventListener('scroll', controlNavbar)
      }
   }, [lastScrollY])

   const controlNavbar = () => {
      const newScroll = window.scrollY
      if (newScroll > 200) {
         if (lastScrollY < newScroll && !showMenu) {
            setShow('hide')
         } else {
            setShow('show')
         }
      } else {
         setShow('top')
      }
      setLastScrollY(newScroll)
   }

   const openSearch = () => {
      setShowMenu(false)
      setShowSearchInput(true)
   }

   const openMenu = () => {
      setShowMenu(true)
      setShowSearchInput(false)
   }

   const searchHandler = e => {
      if (e.key === 'Enter' && query.length > 0) {
         setTimeout(() => {
            setShowSearchInput(false)
         }, 1000)
         navigate(`/search/${query}`)
      }
   }

   const handleNavigation = where => {
      setShowMenu(false)
      navigate(where)
   }

   return (
      <header className={`${showMenu ? 'mobileView' : ''} ${show}`}>
         <ContentWrapper className="contentWrapper">
            <div className="logo" onClick={() => handleNavigation('/')}>
               <img src={logo} alt="Company Logo" />
            </div>
            <ul className="menuItems">
               <li
                  className="menuItem"
                  onClick={() => handleNavigation('/explore/movie')}
               >
                  Movies
               </li>
               <li
                  className="menuItem"
                  onClick={() => handleNavigation('/explore/tv')}
               >
                  TV Shows
               </li>
               <li className="menuItem">
                  <SearchOutlined onClick={openSearch} />
               </li>
            </ul>
            <div className="mobile-view">
               <SearchOutlined onClick={openSearch} />
               {showMenu ? (
                  <CloseOutlined onClick={() => setShowMenu(false)} />
               ) : (
                  <MenuOutlined onClick={openMenu} />
               )}
            </div>
         </ContentWrapper>
         {showSearchInput && (
            <div className="searchBar">
               <ContentWrapper>
                  <div className="searchInput">
                     <input
                        placeholder="Search for a movie or TV show....."
                        onKeyUp={searchHandler}
                        onChange={e => setQuery(e.target.value)}
                     />
                     <CloseOutlined onClick={() => setShowSearchInput(false)} />
                  </div>
               </ContentWrapper>
            </div>
         )}
      </header>
   )
}

export default Header
