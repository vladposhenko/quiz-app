import React, {useState} from 'react';
import {Box, Button} from "@mui/material";
import QuizForm from "../QuizForm/QuizForm";
import Loader from "../Loader/Loader";
import {useAppSelector} from "../../../app/hooks";

const AdminPanel = () => {
    const status = useAppSelector(state => state.quiz.createStatus)
    const [isFormOpened, setFormOpened] = useState(false)
    return (
        <Box sx={{ bgcolor:'primary.dark', marginTop:'-50px', marginBottom:'50px', p:1}}>
            <Button
                    onClick={() => setFormOpened(!isFormOpened) }
                    size="small"
                    color="secondary"
                    variant="contained">Create New Question
            </Button>
            {status === 'creating'
                ? <Loader toDarkBg={'creating'}/>
                : <QuizForm active={isFormOpened} setActive={setFormOpened}/>
            }
        </Box>
    );
};

export default AdminPanel;