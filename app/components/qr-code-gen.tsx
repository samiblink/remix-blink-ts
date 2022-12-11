import QRCode from "react-qr-code";
export const QRcodeData = document.getElementById("qr-code")
export const QRcodeView = () => {
    const productSkuList = [
        {
            value: "www.blink.fi/portal/items/SKU1200502-1"
        },
        {
            value: "SKU1200502-2"
        }
    ]
    return (
       <div className="h-auto w-64">
            <QRCode
            id="qr-code" 
            value={productSkuList[0].value} 
            size={64}
            style={{ height: "auto", maxWidth: "256px", width: "100%" }}
            viewBox={`0 0 ${64} ${64}`}

            />
            
       </div>
    )
}
