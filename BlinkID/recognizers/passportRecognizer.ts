import { Recognizer, RecognizerResult } from '../recognizer'
import {
    MrzResult,
    ImageExtensionFactors,
} from '../types'

/**
 * Result object for PassportRecognizer.
 */
export class PassportRecognizerResult extends RecognizerResult {
    faceImage: any;
    fullDocumentImage: any;
    mrzResult: MrzResult | null;
    constructor(nativeResult) {
        super(nativeResult.resultState);
        
        /**
         * face image from the document if enabled with returnFaceImage property.
         */
        this.faceImage = nativeResult.faceImage;
        
        /**
         * full document image if enabled with returnFullDocumentImage property.
         */
        this.fullDocumentImage = nativeResult.fullDocumentImage;
        
        /**
         * The data extracted from the machine readable zone.
         */
        this.mrzResult = nativeResult.mrzResult != null ? new MrzResult(nativeResult.mrzResult) : null;
        
    }
}

/**
 * Recognizer which can scan all passports with MRZ.
 */
export class PassportRecognizer extends Recognizer {
    anonymizeNetherlandsMrz: boolean;
    detectGlare: boolean;
    faceImageDpi: number;
    fullDocumentImageDpi: number;
    fullDocumentImageExtensionFactors: ImageExtensionFactors;
    returnFaceImage: boolean;
    returnFullDocumentImage: boolean;
    createResultFromNative: (nativeResult: any) => PassportRecognizerResult;
    constructor() {
        super('PassportRecognizer');
        
        /**
         * Defines whether to anonymize Netherlands MRZ
         * 
         * 
         */
        this.anonymizeNetherlandsMrz = true;
        
        /**
         * Defines if glare detection should be turned on/off.
         * 
         * 
         */
        this.detectGlare = true;
        
        /**
         * Property for setting DPI for face images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         * 
         * 
         */
        this.faceImageDpi = 250;
        
        /**
         * Property for setting DPI for full document images
         * Valid ranges are [100,400]. Setting DPI out of valid ranges throws an exception
         * 
         * 
         */
        this.fullDocumentImageDpi = 250;
        
        /**
         * Image extension factors for full document image.
         * 
         * @see ImageExtensionFactors
         * 
         */
        this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
        
        /**
         * Sets whether face image from ID card should be extracted
         * 
         * 
         */
        this.returnFaceImage = false;
        
        /**
         * Sets whether full document image of ID card should be extracted.
         * 
         * 
         */
        this.returnFullDocumentImage = false;
        
        this.createResultFromNative = function (nativeResult) { return new PassportRecognizerResult(nativeResult); }
    }
}