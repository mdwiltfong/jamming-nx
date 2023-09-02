import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
interface NavBarListItemsProps extends PropsWithChildren {
  path: string;
  text: string;
}

export const NavBarListItem: React.FC<NavBarListItemsProps> = ({
  path,
  text,
}) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(path);
  }
  return (
    <>
      <ListItem key={text} disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </>
  );
};
