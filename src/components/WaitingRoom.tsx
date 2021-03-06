import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Room, initRoom } from '../types/room';
import { User, initUser } from '../types/user';
import {
  Button,
  ClickAwayListener,
  List, ListItem, ListItemText,
  Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const WaitingRoom: React.FC = () => {
  const [user, setUser] = useState<User>(initUser);
  const [room, setRoom] = useState<Room>(initRoom);
  const [users, setUsers] = useState<User[]>([]);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const roomId = sessionStorage.getItem('roomId');
  //   const userId = sessionStorage.getItem('userId');

  //   // client <--- server
  //   socket.on('getRoom', (room: Room, users: User[]) => {
  //     console.log('getRoom');
  //     setRoom({ ...room });
  //     setUsers([...users]);
  //   });

  //   socket.on('getUser', (user: User) => {
  //     console.log('getUser');
  //     setUser({ ...user });
  //   });

  //   socket.on('onMemberChanged', (room: Room, users: User[]) => {
  //     console.log('onMemberChanged');
  //     setRoom(room);
  //     setUsers([...users]);
  //   });

  //   socket.on('leave', (room: Room, user: User) => {
  //     console.log('leave');
  //     setRoom(room);
  //   });

  //   socket.on('choice', (room: Room) => {
  //     console.log('choice');
  //     navigate('/game');
  //   });

  //   // client ---> server
  //   socket.emit('getRoom', roomId);
  //   socket.emit('getUser', userId);

  //   return () => {
  //     socket.off('getRoom');
  //     socket.off('getUser');
  //     socket.off('onMemberChanged');
  //     socket.off('leave');
  //     socket.off('choice');
  //   };
  // }, [navigate, socket]);

  const handleStart = () => {
    // socket.emit('choice', room.id);
  };

  const handleLeave = () => {
    // socket.emit('leave', room.id, user);
    navigate('/');
  };

  const handleOnCopyButtonClick = () => {
    navigator.clipboard.writeText(room.id).then(() => {
      setTooltipOpen(true);
    }, (err) => {
      console.log('Failed to copy text: ', err);
    });
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Stack spacing={2} direction='column' margin={4}>
      <Typography variant='h2' component='div' gutterBottom>
        ?????????
      </Typography>
      <Typography variant='h3' component='div' gutterBottom>
        ???????????????
      </Typography>
      <Stack spacing={0} direction='row'>
        <TextField size='small' label='?????????ID' InputProps={{ readOnly: true }} value={room.id} />
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{ disablePortal: true }}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title='Copied'
          >
            <Button variant='contained' onClick={handleOnCopyButtonClick}><ContentCopyIcon /></Button>
          </Tooltip>
        </ClickAwayListener>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell>??????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell>{room.rule.wereWolves} ???</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>?????????</TableCell>
              <TableCell>{room.rule.fortuneTellers} ???</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>?????????</TableCell>
              <TableCell>{room.rule.mediumns} ???</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>??????????????????</TableCell>
              <TableCell>{room.rule.hunters} ???</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell>{room.rule.maniacs} ???</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell>{room.rule.villagers} ???</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='h3' component='div' gutterBottom>
        ????????????????????????
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button fullWidth variant='outlined' onClick={handleLeave}>????????????</Button>
        {user.isHost && (
          <Button fullWidth variant='contained' onClick={handleStart} disabled={room.userIds.length !== room.rule.wereWolves + room.rule.fortuneTellers + room.rule.mediumns + room.rule.hunters +  room.rule.maniacs + room.rule.villagers}>???????????????</Button>
        )}
      </Stack>
    </Stack>
  );
};

export default WaitingRoom;
