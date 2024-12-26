import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdmnMain";
import "./admin.css"

export default function AdminDashboard(){

    return(
        <section className="admin-dashboard">
            <AdminSidebar/>
            <AdminMain/>
        </section>
    )
}