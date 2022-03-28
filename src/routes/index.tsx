import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Landing from '../pages/Landing';
import ResetPassword from '../pages/ResetPassword';
import ConfirmEmail from '../pages/ConfirmEmail';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import EditProduct from '../pages/EditProduct';
import CreateProduct from '../pages/CreateProduct';
import UsersProducts from '../pages/UsersProducts';
import ViewUser from '../pages/ViewUser';
import Contents from '../pages/Contents';
import ContentVideos from '../pages/ContentVideos';
import ContentPhotos from '../pages/ContentPhotos';
import CreateContent from '../pages/CreateContent';
import CreateContentPhoto from '../pages/CreateContentPhoto';
import CreateContentVideo from '../pages/CreateContentVideo';
import Tags from '../pages/Tags';
import CreateTag from '../pages/CreateTag';
import Notifications from '../pages/Notifications'
import NotifProduct from '../pages/NotifProduct';
import NotificationProduct from '../pages/NotificationProduct';
import NotificationAll from '../pages/NotificationAll';
import TagNfc from '../pages/TagNfc';
import Passwords from '../pages/Passwords';
import PrivacyPolicy from '../pages/PrivacyPolicy';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/landing" component={Landing} />
            <Route path="/reset_password" component={ResetPassword} />
            <Route path="/confirm_email" component={ConfirmEmail} />
            <Route path="/dashboard" component={Dashboard} isPrivate={true} />
            <Route path="/products" component={Products} isPrivate={true} />
            <Route path="/edit/:id" component={EditProduct} isPrivate={true} />
            <Route path="/register" component={CreateProduct} isPrivate={true} />
            <Route path="/users/:id" component={UsersProducts} isPrivate={true} />
            <Route path="/viewuser/:id" component={ViewUser} isPrivate={true} />
            <Route path="/contents" component={Contents} isPrivate={true} />
            <Route path="/productscontentvideos/:id" component={ContentVideos} isPrivate={true} />
            <Route path="/productscontentphotos/:id" component={ContentPhotos} isPrivate={true} />
            <Route path="/createcontent" component={CreateContent} isPrivate={true} />
            <Route path="/createvideo/:id" component={CreateContentVideo} isPrivate={true} />
            <Route path="/createphoto/:id" component={CreateContentPhoto} isPrivate={true} />
            <Route path="/tags" component={Tags} isPrivate={true} />
            <Route path="/createtag" component={CreateTag} isPrivate={true} />
            <Route path="/notifications" component={Notifications} isPrivate={true} />
            <Route path="/notifproduct" component={NotifProduct} isPrivate={true} />
            <Route path="/notification/:id" component={NotificationProduct} isPrivate={true} />
            <Route path="/notificationall" component={NotificationAll} isPrivate={true} />
            <Route path="/tagnfc" component={TagNfc} isPrivate={true} />
            <Route path="/passwords" component={Passwords} isPrivate={true} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
        </Switch>
    );
}

export default Routes;