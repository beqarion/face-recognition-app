const Rank = ({ user }) => {
    return (
        <div>
            <div className='white f3'>
                {`${user.name}, current rank is...`}
            </div>
            <div className='white f1'>
                {`#${user.entries}`}
            </div>
        </div>
    )
}

export default Rank