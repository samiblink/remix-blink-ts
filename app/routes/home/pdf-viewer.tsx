import { Modal } from '../../components/modal';
import { QRcodeView, QRcodeData } from '~/components/qr-code-gen';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Svg } from '@react-pdf/renderer';

//const QrCodeString = new XMLSerializer().serializeToString(QRcodeData)
export default function PdfViewer() {
    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
      return (
        <Modal isOpen={true} className="w-2/3 h-2/3">
            <PDFViewer width={"75%"} height={"100%"}>
                <Document>
                    <Page size="C6" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Produced By: Blink Creative Oy</Text>
         
                        </View>
                            
                    </Page>
                </Document>
            </PDFViewer>
        </Modal>
      )
}