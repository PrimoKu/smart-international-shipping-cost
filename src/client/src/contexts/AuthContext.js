import React, { createContext, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
    Modal,
    ModalHeader,
    UncontrolledAlert,
    Alert
} from "reactstrap";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const [parsedMessage, setParsedMessage] = useState({ text: '', link: '' });
    const [modalNotification, setModalNotification] = useState(false);
    const [groupOrderId, setGroupOrderId] = useState('');
    const toastRef = useRef(null);

    const showNotification = (parsedMessage) => {
        const messageContent = (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="text-dark" style={{ fontSize: '20px' }}>
                    {parsedMessage.text}
                    {/* {parsedMessage.link && (
                        <a href={parsedMessage.link} target="_blank" rel="noopener noreferrer"> Click here</a>
                    )} */}
                </div>
                {parsedMessage.link && (
                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        <Button label="Accept" className="p-button-success" onClick={() => acceptInvite(parsedMessage.link)}/>
                        <Button label="Decline" className="p-button-danger" onClick={() => toastRef.current.clear()} />
                    </div>
                )}
            </div>
        );
        toastRef.current.show({ 
            severity: 'info', summary: 'Notification', detail: messageContent, life: 10000 
        });
    };

    const acceptInvite = async (link) => {
        const segments = link.split('/');
        const groupOrderId = segments.pop();
        console.log(groupOrderId);
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/groupOrders/add/${groupOrderId}`, {}, { withCredentials: true })
        .then(response => {
            window.location.assign(`http://localhost:3000/admin/groupOrder/${groupOrderId}`);
        })
        .catch((error) => {
            if (error.response && error.response.data) {
            console.log(error.response);
            }
        });
    }

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/current`, { withCredentials: true });
                if (res.data) {
                    // console.log(res.data);
                    setUser(res.data);
                    setIsAuthenticated(true);
                    if(!socket) {
                        const socketInstance = io(`${process.env.REACT_APP_SERVER_URL}`);
                        setSocket(socketInstance);

                        socketInstance.on('connect', () => {
                            console.log('Connected to server');
                            socketInstance.emit('register', res.data._id);
                        });

                        socketInstance.on('notification', (message) => {
                            console.log(message);
                            const match = message.match(/(http[^\s]+)/);
                            let newParsedMessage;
                            if (match) {
                                newParsedMessage = {
                                    text: message.replace(match[0], '').trim(),
                                    link: match[0]
                                };
                                var segments = match[0].split('/');
                                var lastSegment = segments.pop();
                                console.log(lastSegment);

                                setGroupOrderId(lastSegment);
                            } else {
                                newParsedMessage = { text: message, link: '' };
                            }
                        
                            showNotification(newParsedMessage);
                        
                            setParsedMessage(newParsedMessage);
                        });
                    }
                } else {
                    handleLogout();
                }
            } catch (error) {
                handleLogout();
            }
        }

        const handleLogout = () => {
            if(socket) {
                socket.disconnect();
                setSocket(null);
            }
            setUser(null);
            setIsAuthenticated(false);
            navigate('/');
        }

        fetchUser();

        return () => {
            if(socket) {
                socket.disconnect();
            }
        }
    }, [navigate, socket]);

    const toggleNotification = () => {
        setModalNotification(!modalNotification);
    };
    
    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            <Toast ref={toastRef} position="top-center" style={{ backgroundColor: 'white' }}/>
            { children }
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};
  
export { AuthProvider, useAuth };