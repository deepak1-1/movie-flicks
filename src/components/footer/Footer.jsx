import {
   TwitterOutlined,
   InstagramOutlined,
   LinkedinFilled,
   GithubOutlined
} from '@ant-design/icons'

import { ContentWrapper } from '../../styled'
import './styles.scss'

const Footer = () => {
   return (
      <footer>
         <ContentWrapper className="contentWrapper">
            <ul className="menuItems">
               <li className="menuItem" disabled>
                  Terms Of Use
               </li>
               <li className="menuItem" disabled>
                  Privacy-Policy
               </li>
               <li className="menuItem" disabled>
                  About
               </li>
               <li className="menuItem" disabled>
                  Blog
               </li>
               <li className="menuItem" disabled>
                  FAQ
               </li>
            </ul>
            <div className="infoText">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
               enim ad minim veniam, quis nostrud exercitation ullamco laboris
               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
               reprehenderit in voluptate velit esse cillum dolore eu fugiat
               nulla pariatur.
            </div>
            <div className="socialIcons">
               <span
                  className="icon"
                  onClick={() =>
                     window.open(
                        'https://github.com/deepak1-1/movie-flicks.git',
                        '_blank'
                     )
                  }
               >
                  <GithubOutlined />
               </span>
               <span
                  className="icon"
                  onClick={() =>
                     window.open(
                        'https://www.instagram.com/im_deep.k__/',
                        '_blank'
                     )
                  }
               >
                  <InstagramOutlined />
               </span>
               <span className="icon not-allowed" disabled>
                  <TwitterOutlined />
               </span>
               <span
                  className="icon"
                  onClick={() =>
                     window.open(
                        'https://www.linkedin.com/in/deepak-tewatia-72273b1b5/',
                        '_blank'
                     )
                  }
               >
                  <LinkedinFilled />
               </span>
            </div>
         </ContentWrapper>
      </footer>
   )
}

export default Footer
