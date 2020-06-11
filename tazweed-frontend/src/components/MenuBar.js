import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link }  from 'react-router-dom'

function MenuBar() {


    const pathname= window.location.pathname;
    const path = pathname === '/' ? 'home': pathname.substr(1);

    const [activeItem,setActiveItem] = useState(path);


    const handleItemClick = (e, { name }) => setActiveItem(name);


    return (
      <div>
        <Menu pointing secondary size="massive" color="orange">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='appointments'
            active={activeItem === 'appointments'}
            onClick={handleItemClick}
            as={Link}
            to="/appointments"
          />
           <Menu.Item
            name='requests'
            active={activeItem === 'requests'}
            onClick={handleItemClick}
            as={Link}
            to="/requests"
          />
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={handleItemClick}
            as={Link}
            to="/profile"
          />
          <Menu.Menu position='right'>
          <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />

            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"

            />
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={handleItemClick}
              as={Link}
              to="/logout"

            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }


export default MenuBar;