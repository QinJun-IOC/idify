import { forwardRef, useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Fade from '@mui/material/Fade'
import { TransitionProps } from '@mui/material/transitions'

const ALERTED_CACHE = 'idify.sgement.alert'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

export function SegementAlert() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    if (
        localStorage.getItem(ALERTED_CACHE) !== '1' &&
        sessionStorage.getItem(ALERTED_CACHE) !== '1'
    ) {
      sessionStorage.setItem(ALERTED_CACHE, '1')
      timer = setTimeout(() => {
        timer = undefined
        setOpen(true)
      }, 500)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  return (
      <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
        <DialogTitle>清除相片背景</DialogTitle>
        <DialogContent>
          <DialogContentText>
            页面将在后台移除图像的背景，并且进度将显示在右上角。
            这个过程可能需要一些时间，请耐心等待。在继续之前，您可以选择照片尺寸并进行裁剪。
            一旦过程完成，我们可以继续下一步。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
              onClick={() => {
                handleClose()
                localStorage.setItem(ALERTED_CACHE, '1')
              }}
          >
            不再显示
          </Button>
          <Button onClick={handleClose} autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default SegementAlert
