import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(186, 85, 211, 0.7)', // Soft purple
  '&:hover, &:focus': {
    bgcolor: 'rgba(186, 85, 211, 0.2)', // Lighter purple on hover/focus
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;
    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                Autogen Chat
                </ListItem>
            </List>
        </Drawer>
    );
}