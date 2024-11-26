import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputReuseable from '@/component/atoms/input/input';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { fetchPosition } from '@/services/userService';
import { Position } from '../usersList/usersList';
import { handleCreateUser, handleUpdateUser } from '@/services/userService';
import { User } from '../usersList/usersList';
export interface PropDialog{
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    actionDialog:string;
    dataDialog:{};
    disabled:boolean
}

export interface UserDataProps {
  id?: number | string;
  email: string;
  userName: string;
  phone: string;
  address: string;
  password: string;
  sex: string;
  getPosition: string| number;
}

export  const mapUserToUserDataProps = (user: User): UserDataProps => {
  return {
    id: user.id, // Thêm ánh xạ id
    email: user.email,
    userName: user.username, // Chú ý viết đúng key "userName" thay vì "username"
    phone: user.phone,
    address: user.address || '',
    password: '', // Không truyền mật khẩu từ User
    sex: user.sex || 'Male',
    getPosition: user.position?.id || '',
  };
};
export default function DialogCreate({open, onClose, onConfirm, actionDialog, dataDialog, disabled}: PropDialog) {
const defaultUserData:UserDataProps = {
    id: '',
    email: '',
    userName:'',
    phone:'',
    address:'',
    password:'',
    sex:'Male',
    getPosition: '',
  } 

  const defaultValidInput = {
    id:true,
    email: true,
    userName: true,
    phone: true,
    address: true,
    password: true,
    sex: true,
    getPosition: true,
  }

  const [userData, setUserData] = useState(defaultUserData)
  const [position, setPosition ] = useState<Position[]| []>([])
  const [validInput, setValidInput] = useState(defaultValidInput)

  const handleFetchPosition = async () =>{
    let response = await fetchPosition()
    if (response.data.EC === 0) {
      setPosition(response.data.DT as Position[]);
      if (response.data.DT && response.data.DT.length > 0) {
        let position = response.data.DT;
        setUserData({...userData, getPosition: position[0].id })
      }
    } else {
      toast.error(response.data.EM)
    }
  }

  const handleOnchangeInput = (value: string, name: keyof UserDataProps ) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInput = () => {
    setValidInput(defaultValidInput); // Reset trạng thái
    let arr: (keyof UserDataProps)[] = ['email', 'userName', 'phone', 'password', 'address'];
  
    let _validInputs = _.cloneDeep(defaultValidInput);
    let check = arr.every((field) => {
      if (!userData[field]) {
        _validInputs[field] = false;
        return false; // Nếu bất kỳ giá trị nào trống, `every` sẽ trả về false
      }
      return true;
    });
  
    setValidInput(_validInputs);
  
    if (!check) {
      toast.error('Some inputs are empty'); // Gộp thông báo lỗi
    }
  
    return check;
  };
  
  const handleClose = () => {
    onClose();
    setValidInput(defaultValidInput)
  }

  const handleCreate = async () =>{
    let check = checkValidateInput()
    if (check) {
      let data = userData;
      let res = await handleCreateUser(data.email, data.phone, data.userName, data.password, data.address, data.sex, data.getPosition)
      let validate = res.data
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setUserData(defaultUserData)
        onConfirm()
        handleClose()
      } else {
        toast.error(validate.EM)
      }
    }
  }

  const handleUpdate = async () => {
    let data = userData;
    let res= await handleUpdateUser(data.id,data.userName, data.address, data.sex, data.getPosition)
    let validate = res.data
      if (validate.EC === 0) {
        toast.success(validate.EM)
        setUserData(defaultUserData)
        onConfirm()
        handleClose()
      } else {
        toast.error(validate.EM)
      }
    }
  useEffect(() => {
    handleFetchPosition();
  }, []);

  useEffect(() => {
  if (dataDialog && 'id' in dataDialog) {
    const mappedData = mapUserToUserDataProps(dataDialog as User); // Ép kiểu
    setUserData(mappedData);
  } else {
    setUserData(defaultUserData); // Sử dụng dữ liệu mặc định nếu không hợp lệ

  }
}, [dataDialog]);
  let inputClassNameDisable = 'my-1 w-full text-sm text-gray-900 bg-gray-200 border-0 border-b-2 border-gray-300 rounded-none'
  let inputClassName =  'my-1 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 rounded-none'
  let inputClassNameError = 'my-1 w-full text-sm text-gray-900 bg-red-50 focus:bg-red-50 border-0 border-b-2 border-red-500 placeholder-red-600 text-red-900 focus:border-red-600 rounded-none'
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-placeholderledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {actionDialog === 'CREATE' ? 'Create new user' : 'Update current uer'}
        </DialogTitle>
        <Divider/>
        <DialogContent>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <InputReuseable
                    placeholder="Email address:"
                    value={userData.email}
                    disabled={disabled}
                    type="email"
                    onChange={(e) => handleOnchangeInput(e.target.value, "email")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    placeholder="User name"
                    value={userData.userName}
                    onChange={(e) => handleOnchangeInput(e.target.value, "userName")}
                    className={
                      Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    placeholder="Phone"
                    value={userData.phone}
                    disabled={disabled}
                    onChange={(e) => handleOnchangeInput(e.target.value, "phone")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
                <div>
                    <InputReuseable
                    placeholder="Password"
                    value={userData.password}
                    type="password"
                    disabled={disabled}
                    onChange={(e) => handleOnchangeInput(e.target.value, "password")}
                    className={
                      disabled 
                        ? inputClassNameDisable
                        : Object.values(validInput).some((value) => !value)
                        ? inputClassNameError
                        : inputClassName
                    }
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 mt-4'>
                <InputReuseable
                placeholder="Address"
                value={userData.address}
                onChange={(e) => handleOnchangeInput(e.target.value, "address")}
                className={
                  Object.values(validInput).some((value) => !value)
                    ? inputClassNameError
                    : inputClassName
                }
                />
            </div>
            <form className="mt-4 w-full grid grid-cols-2 gap-4 mx-auto">
                <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select id="gender"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={userData.sex}
                      onChange={(e) => handleOnchangeInput(e.target.value, "sex")}
                      >
                        <option defaultValue={'Male'}>Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                    <select id="position" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={userData.getPosition}
                      onChange={(e) => handleOnchangeInput(e.target.value, "getPosition")}
                      >
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={actionDialog === "CREATE" ? handleCreate : handleUpdate}>
            {actionDialog === "CREATE" ? "CREATE" : "SAVE"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
