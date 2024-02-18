import { useState, useEffect }  from 'react';
import { db, auth } from './firebase';
import CommonDialog from './CommonDialog';
import { doc, addDoc, collection, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { 
  Button, 
  TextField, 
  Checkbox,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function TaskManagement() {
  const [taskList, setTaskList] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState('');

  // 表示
  const dispData = () => { 
    
    const tasksCollectionRef = collection(db, 'tTasks');
    const q = query(tasksCollectionRef, where("userId", "==", auth.currentUser?.uid));

    onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        const task = {
          docId: doc.id,
          taskText: doc.data().taskText,
          timeStamp: doc.data().timeStamp,
        };
        tasks.push(task);
      });
      setTaskList(tasks);
    });
  };

  // 登録
  const addTask = (inputText) => {
    if (inputText === '') {
      return;
    };
    const tasksCollectionRef = collection(db, 'tTasks');
    const nowTime = new Date();
    const nowYear = nowTime.getFullYear();
    const nowMonth = nowTime.getMonth();
    const nowDay = nowTime.getDate();
    const nowHour = nowTime.getHours();
    const nowMin = nowTime.getMinutes();
    const nowSec = nowTime.getSeconds();

    const user = auth.currentUser;
    const userId = user.uid;

    addDoc(tasksCollectionRef, {
      taskText: inputText,
      timeStamp: `${nowYear}/${nowMonth}/${nowDay} ${nowHour}:${nowMin}:${nowSec}`,
      userId: userId
    });
    setTaskText('');
    dispData();
  };

  // 削除(確認)
  const deleteTaskConfirm = (docId) => {
    setDeleteDocId(docId);
    setIsOpenDeleteConfirm(true);
  };

  // 削除
  const deleteTask = async() => {
    setIsOpenDeleteConfirm(false);
    const userDocumentRef = doc(db, 'tTasks', deleteDocId);
    await deleteDoc(userDocumentRef);
    dispData();
  };

  // タスクチェックボックスのオンオフ切り替え時
  const changeTaskChecked = (blnChecked, numIndex) => {
    // オフ→オンのときテキストの文字色を変える
    if (blnChecked === true) {
      const taskText = document.getElementById(`taskText${numIndex}`);
      if (taskText !== null) {
        taskText.style.color = '#FF0000';
      };
    } else {
      const taskText = document.getElementById(`taskText${numIndex}`);
      if (taskText !== null) {
        taskText.style.color = '#000000';
      };
    };
  };

  // 初期処理
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        dispData();
      }
    })
  }, []);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow key="tableHeadRow">
              <TableCell key="cell1">
              </TableCell>
              <TableCell key="cell2">
              </TableCell>
              <TableCell key="cell3">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((user, index) => (
              <>
              <TableRow key={index.toString()}>
                <TableCell>
                  <Checkbox
                    onChange={(e) => changeTaskChecked(e.target.checked, index)}  
                  />
                </TableCell>
                <TableCell>
                  <Typography key={user.docId} id={`taskText${index.toString()}`}>
                    {user.taskText}
                  </Typography>
                  <Typography>
                    {user.timeStamp.toString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteTaskConfirm(user.docId)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      fixedWidth
                    />
                  </Button>
                </TableCell>
              </TableRow>
              <CommonDialog
                msg="このタスクを削除しますか？"
                isOpen={isOpenDeleteConfirm}
                doYes={deleteTask}
                doNo={() => {setIsOpenDeleteConfirm(false)}}
              />
              </>
            ))}
            <TableRow>
              <TableCell>
              </TableCell>
              <TableCell>
                <TextField
                  value={taskText}
                  label="Todoを入力"
                  variant="standard" 
                  size="small"
                  fullWidth
                  onChange={(e) => {setTaskText(e.target.value)}}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => addTask(taskText)}
                >
                  ＋
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TaskManagement;

