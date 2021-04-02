import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    //const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.error(err);
            });

        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])


    //LIKE CARD
    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.error(err);
            });
    }

    //DELETE CARD
    function handleCardDelete(deleteCard) {
        api.removeCard(deleteCard)
            .then(() => {
                const newArr = cards.filter(card => card !== deleteCard);
                setCards(newArr);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    /*
    function handleDeleteCard(){
        setIsDeletePopup(true);
    }*/

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        //setIsDeletePopup(false);
        setSelectedCard({ name: '', link: '' });
    }
    function handleCardClick(Card) {
        setSelectedCard(Card);
    }

    function handleUpdateUser(formData) {
        api.editProfile(formData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleUpdateAvatar(formData) {
        api.updateAvatar(formData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //ADD CARD
    function handleAddPlaceSubmit(newCard) {
        api.postCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
    }

    function changeLogged() {
        setLoggedIn(true)
    }

    return (

        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Switch>
                    <ProtectedRoute
                        exact path='/'
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        component={Main}
                    >
                    </ProtectedRoute>
                    <Route exact path='/sign-up'>
                        <Register />
                    </Route>

                    <Route exact path='/sign-in'>
                        <Login authorized={changeLogged} />
                    </Route>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups} />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                </Switch>
                {/*<PopupWithForm
            isOpen={isDeletePopup}
            onClose ={closeAllPopups}
            name='delete-card-form'
            title='Вы уверены?'
            textButton='Да'/>*/}
                <Footer />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
