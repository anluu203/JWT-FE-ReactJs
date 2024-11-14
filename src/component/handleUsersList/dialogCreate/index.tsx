import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputReuseable from '@/component/atoms/input/input';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchPosition } from '@/services/userService';
import { Position } from '../usersList/usersList';
interface PropDialog{
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}



export default function DialogCreate({open, onClose, onConfirm}: PropDialog) {

  const [position, setPosition ] = useState<Position[]| []>([])


  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassWord] = useState("")
  const [address, setAddress] = useState("")
  const [sex, setSex] = useState("")
  const [getPosition, setGetPosition] = useState("")

  const handleFetchPosition = async () =>{
    let response = await fetchPosition()
    setPosition(response.data.DT)
  }

  useEffect(() => {
    handleFetchPosition()
  },[])
   let inputClassName =  'my-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 rounded-none'

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-placeholderledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {"Create new user"}
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <InputReuseable
                    placeholder="Email address:"
                    name="email"
                    type="email"
                    className={inputClassName}
                    />
                </div>
                <div>
                    <InputReuseable
                    placeholder="User name"
                    name="username"
                    className={inputClassName}
                    />
                </div>
                <div>
                    <InputReuseable
                    placeholder="Phone"
                    name="phone"
                    className={inputClassName}
                    />
                </div>
                <div>
                    <InputReuseable
                    placeholder="Password"
                    name="password"
                    type="password"
                    className={inputClassName}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 mt-4'>
                <InputReuseable
                placeholder="Address"
                name="Address"
                className={inputClassName}
                />
            </div>
            <form className="mt-4 w-full grid grid-cols-2 gap-4 mx-auto">
                <div>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value={'Male'}>Male</option>
                        <option value="US">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {position.length > 0 ? (
                          position.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>{item.name}</option>
                            )
                          }
                        )
                        ) : (
                              <option value="">Loading positions...</option>
                      )}
                    </select>
                </div>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
