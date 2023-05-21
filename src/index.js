import 'normalize.css';
import './scss/styles.scss';

import UI from './modules/UI';

UI.loadHomePage();
UI.displayModal();
UI.closeAddTaskModal();
UI.closeEditTaskModal();
UI.displayTasks();
UI.updateIsCompleted();

