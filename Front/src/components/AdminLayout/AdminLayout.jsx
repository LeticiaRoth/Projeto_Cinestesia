import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import FooterAdmin from '../FooterAdmin/FooterAdmin';

function AdminLayout() {
    return (
        <div>
            <HeaderAdmin />
            <main>
                <Outlet />
            </main>
            <FooterAdmin />
        </div>
    );
}

export default AdminLayout;