import NavbarAdm from '../components/NavbarAdm';
import NewUserForm from '../components/NewUserForm';

export default function AdminManager() {
  return (
    <div>
      <NavbarAdm />

      <main className="p-6">
        <section>
          <p className="py-2 text-xl font-bold">Register new user</p>
          <NewUserForm />
        </section>

        <section className="pt-6">
          <p className="py-2 text-xl font-bold">Users List</p>
        </section>
      </main>
    </div>
  );
}
