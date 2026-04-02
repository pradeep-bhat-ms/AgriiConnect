import React from 'react'

const variantStyles = {
    danger: 'bg-red-50 border border-red-200 text-red-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
}

const Message = ({ variant = 'info', children }) => {
    const style = variantStyles[variant] || variantStyles.info

    return (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium mb-4 ${style}`}>
            {children}
        </div>
    )
}

export default Message
