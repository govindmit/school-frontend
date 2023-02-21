import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

export default function DeleteFormDialog({
    open,
    closeDialog,
}: {
    open: any;
    closeDialog: any;
}) {

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Delete Credit Notes</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure want to reject “Credit Notes” from
                    the records.
                </DialogContentText>
                <Grid>
                    <Stack>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name">
                                        Add Note
                                    </InputLabel>
                                    <OutlinedInput
                                        type="text"
                                        id="name"
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={closeDialog}>ok</Button>
            </DialogActions>
        </Dialog>
    );
}




