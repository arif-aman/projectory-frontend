import { Box, Button, Chip, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const SkillTestCard = ({ skillTest }) => {
  const history = useHistory();

  return (
    <Box minWidth="18rem" width="30%" maxWidth="22rem" flexGrow={1}>
      <Paper>
        <Box py={3} px={2}>
          <Typography variant="h6" gutterBottom>
            {skillTest.title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {skillTest.about}
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            gridGap={12}
            my={3}
          >
            <Chip color="secondary" label={`${Object.keys(skillTest.questions).length} ques`} />
            <Chip color="primary" label={`${skillTest.duration} mins`} />
            <Chip
              color="secondary"
              variant="outlined"
              label={`${skillTest.timesTaken} times taken`}
            />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/skill-test/${skillTest._id}`)}
            >
              Start
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SkillTestCard;