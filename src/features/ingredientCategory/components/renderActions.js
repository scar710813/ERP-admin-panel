import React from "react"
import { Box } from "@mui/system"
import { GridRowModes } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import { Cancel, Loop, Delete, Edit, Save } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import useToggle from "../../../hooks/useToggle"
import ConfirmDialog from "../../../components/dialog/ConfirmDialog"
import {
  selectCurrentRows,
  selectRowModesModel,
  setRowModesModel,
  setRows,
} from "../services/inCaSlice"
import { useDeleteInCategoryMutation } from "../services/inCaApiSlice"

const TableActions = React.memo((props) => {
  const { t } = useTranslation()
  const { row } = props
  const dispatch = useDispatch()
  const rowModesModel = useSelector(selectRowModesModel)
  const currentRows = useSelector(selectCurrentRows)

  const { visible, setToggleStatus } = useToggle(false)

  const { id } = row
  const isEditedMode = rowModesModel?.[id]?.mode === GridRowModes.Edit

  const [deleteSupplier, { isLoading: delLoading }] =
    useDeleteInCategoryMutation()

  const handleSaveClick = () => {
    dispatch(
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    )
  }

  const handleDeleteClick = async () => {
    setToggleStatus(true)
    await deleteSupplier(id)
  }

  const handleCancelClick = () => {
    if (row?.isNew) {
      dispatch(
        setRows(currentRows.filter((currentRow) => currentRow.id !== row.id))
      )
    } else {
      dispatch(
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })
      )
    }
  }
  const handleEditClick = () => {
    dispatch(
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit },
      })
    )
  }

  let content

  if (isEditedMode) {
    content = (
      <>
        <IconButton onClick={handleSaveClick} color="warning">
          <Save />
        </IconButton>
        <IconButton onClick={handleCancelClick} color="textPrimary">
          <Cancel />
        </IconButton>
      </>
    )
  } else {
    content = (
      <>
        <IconButton onClick={handleEditClick} color="textPrimary">
          <Edit />
        </IconButton>
        <ConfirmDialog
          open={visible}
          handleClose={() => setToggleStatus(false)}
          title={t("delConfirm")}
          desc={t("delSupplierDesc")}
          handleConfirm={handleDeleteClick}
        >
          <IconButton
            disabled={delLoading}
            onClick={() => setToggleStatus(true)}
            color="textPrimary"
          >
            {delLoading ? <Loop /> : <Delete />}
          </IconButton>
        </ConfirmDialog>
      </>
    )
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      {content}
    </Box>
  )
})
const renderActions = (params) => {
  return <TableActions row={params.row} />
}
export default renderActions
