import 'github-fork-ribbon-css/gh-fork-ribbon.css'
import Link from '@mui/material/Link'

export function GithubLink() {
    return (
        <Link
            className="github-fork-ribbon z-0"
            sx={{
                '&::before': {
                    backgroundColor: '#0ea5e9 !important',
                },
            }}
            href="http://192.168.66.20:8080/hejia-oa/login.html"
            data-ribbon="SIO系统"
            title="SIO系统"
            target="_blank"
        />
    )
}

export default GithubLink
