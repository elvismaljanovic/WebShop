import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import listProduct from '../action/productAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled() {
   const paginationPage = useSelector(state=>state.paginationControl)
  const {totalPage} = paginationPage
  const classes = useStyles();
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(1);
  const handleChange = (event, page) => {
    dispatch(listProduct(page))
    setPage(page);
  };

  return (
    <div className={classes.root}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
    </div>
  );
}
