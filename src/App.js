import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "./sb-admin-2.min.css";
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Portal from './Portal';
import Disciplinelist from './discipline/Disciplinelist';
import ClientaDisciplina from './clientadisciplina/ClientaDisciplina';
import Clases from './class/Claseslist';
import Instructores from './instructors/Instructores';
import HorarioClase from './horarioclase/HorarioClase';
import DisciplinaView from './discipline/DisciplineView';
import ClaseView from './class/ClaseView';
import InstructorView from './instructors/InstructorView';
import HorarioClaseView from './horarioclase/HorarioClaseView';
import ClientaDisciplinaView from './clientadisciplina/ClientaDisciplinaView';
import Userlist from './client/Userlist';
import UserCreate from './client/UserCreate';
import UserView from './client/UserView';
import UserEdit from './client/UserEdit'
import DisciplinaCreate from './discipline/DisciplineCreate';
import ClaseCreate from './class/ClaseCreate';
import InstructorCreate from './instructors/InstructorCreate';
import HorarioClaseCreate from './horarioclase/HorarioClaseCreate';
import CantidadClaseDisciplinaView from './cupodisciplina/CantiDisciplinaClassView';
import CantiDisciplineClass from './cupodisciplina/CantiDisciplinaClass';
import CantiDisciplineClassCreate from './cupodisciplina/CantiDisciplinaClassCreate';
import ClientaDisciplinaCreate from './clientadisciplina/ClientaDisciplinaCreate';
import ClientCreate from './client/client_component/clientCreateAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/portal' element={<Portal />}>
          <Route path='dashboard' element={<Dashboard />} />
          {/* <!-- URLS - Users --> */}
          <Route path='user-list' element={<Userlist />} />
          <Route path='create-user' element={<UserCreate />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='user-edit/:id' element={<UserEdit />} />

          {/* <!-- URLS - Clienta Account --> */}
          <Route path='create-client/:rut' element={<ClientCreate />}/>
          
          {/* <!-- URLS - Discipline --> */}
          <Route path='discipline-list' element={<Disciplinelist />}></Route>
          <Route path='create-discipline' element={<DisciplinaCreate />} />
          <Route path='discipline-view/:id' element={<DisciplinaView />}></Route>

          {/* <!-- URLS - Clienta Has Disciplina --> */}
          <Route path='clienta-disciplina-list' element={<ClientaDisciplina />}></Route>
          <Route path='clienta-disciplina-view/:id' element={<ClientaDisciplinaView />}></Route>
          <Route path='clienta-disciplina-create' element={<ClientaDisciplinaCreate />}></Route>

          {/* <!-- URLS - Cuantity Discipline for Class --> */}
          <Route path='cant-discipline-list' element={<CantiDisciplineClass />}></Route>
          <Route path='cant-discipline-view/:id' element={<CantidadClaseDisciplinaView />}></Route>
          <Route path='cant-discipline-create' element={<CantiDisciplineClassCreate />}></Route>

          {/* <!-- URLS - Clases --> */}
          <Route path='clases-list' element={<Clases />}></Route>
          <Route path='clases-view/:id' element={<ClaseView />}></Route>
          <Route path='clases-create' element={<ClaseCreate />}></Route>

          {/* <!-- URLS - Instructores --> */}
          <Route path='instructores-list' element={<Instructores />}></Route>
          <Route path='instructor-view/:id' element={<InstructorView />}></Route>
          <Route path='instructores-create' element={<InstructorCreate />}></Route>

          {/* <!-- URLS - HorarioClase --> */}
          <Route path='horario-clase-list' element={<HorarioClase />}></Route>
          <Route path='horario-clase-view/:id' element={<HorarioClaseView />}></Route>
          <Route path='horario-clase-create' element={<HorarioClaseCreate />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
