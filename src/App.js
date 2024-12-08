import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "./sb-admin-2.min.css";
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Userlist from './Userlist';
import Portal from './Portal';
import UserCreate from './UserCreate';
import UserView from './UserView';
import UserEdit from './UserEdit';
import Disciplinelist from './Disciplinelist';
import CantiDisciplineClass from './CantiDisciplinaClass';
import ClientaDisciplina from './ClientaDisciplina';
import Clases from './Claseslist';
import Instructores from './Instructores';
import HorarioClase from './HorarioClase';
import DisciplinaView from './DisciplineView';
import ClaseView from './ClaseView';
import InstructorView from './InstructorView';
import HorarioClaseView from './HorarioClaseView';
import CantidadClaseDisciplinaView from './CantiDisciplinaClassView';
import ClientaDisciplinaView from './ClientaDisciplinaView';

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
          
          {/* <!-- URLS - Discipline --> */}
          <Route path='discipline-list' element={<Disciplinelist />}></Route>
          <Route path='create-discipline' element={<UserCreate />} />
          <Route path='discipline-view/:id' element={<DisciplinaView />}></Route>

          {/* <!-- URLS - Clienta Has Disciplina --> */}
          <Route path='clienta-disciplina-list' element={<ClientaDisciplina />}></Route>
          <Route path='clienta-disciplina-view/:id' element={<ClientaDisciplinaView />}></Route>

          {/* <!-- URLS - Cuantity Discipline for Class --> */}
          <Route path='cant-discipline-list' element={<CantiDisciplineClass />}></Route>
          <Route path='cant-discipline-view/:id' element={<CantidadClaseDisciplinaView />}></Route>

          {/* <!-- URLS - Clases --> */}
          <Route path='clases-list' element={<Clases />}></Route>
          <Route path='clases-view/:id' element={<ClaseView />}></Route>

          {/* <!-- URLS - Instructores --> */}
          <Route path='instructores-list' element={<Instructores />}></Route>
          <Route path='instructor-view/:id' element={<InstructorView />}></Route>

          {/* <!-- URLS - HorarioClase --> */}
          <Route path='horario-clase-list' element={<HorarioClase />}></Route>
          <Route path='horario-clase-view/:id' element={<HorarioClaseView />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
