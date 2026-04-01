import { bootstrapCameraKit, CameraKitSession } from '@snap/camera-kit';
import type { Lens } from '@snap/camera-kit';
import { createContext, useEffect, useRef, useState } from 'react';

// Prod API
const apiToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzc1MDU5Mjc2LCJzdWIiOiJmN2U5ODBjNC00ODhhLTRkZWMtOWM3NS1jODU4NDIzZTZhODh-UFJPRFVDVElPTn5lZDY1M2JlOC1kMGM0LTQwM2YtYWU4NC0xNjg3NDdlMTJjNjgifQ.IRrp3oLbY_d30eaC_hN6qrccH13Ow1WOVZcNCktGyu4';

// Staging API
// const apiToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzc1MDU5Mjc2LCJzdWIiOiJmN2U5ODBjNC00ODhhLTRkZWMtOWM3NS1jODU4NDIzZTZhODh-U1RBR0lOR345NmU2Y2MwNS1mMzI5LTQyZjUtODU5Zi1iOGYzZjNlZWQyYmQifQ._tPEEnmGU12iavp6NgZ_elyKERRQWkMS_6nBwhnw8h0';
// eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzc1MDU5Mjc2LCJzdWIiOiJmN2U5ODBjNC00ODhhLTRkZWMtOWM3NS1jODU4NDIzZTZhODh-U1RBR0lOR345NmU2Y2MwNS1mMzI5LTQyZjUtODU5Zi1iOGYzZjNlZWQyYmQifQ._tPEEnmGU12iavp6NgZ_elyKERRQWkMS_6nBwhnw8h0
// eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzc1MDU5Mjc2LCJzdWIiOiJmN2U5ODBjNC00ODhhLTRkZWMtOWM3NS1jODU4NDIzZTZhODh-UFJPRFVDVElPTn5lZDY1M2JlOC1kMGM0LTQwM2YtYWU4NC0xNjg3NDdlMTJjNjgifQ.IRrp3oLbY_d30eaC_hN6qrccH13Ow1WOVZcNCktGyu4

const lensGroupId = 'a4da2ba5-6d01-441f-942a-99b9a0143fd6';
// lensGroupWeb

export interface CameraKitState {
  session: CameraKitSession;
  lenses: Lens[];
}

export const CameraKitContext = createContext<CameraKitState | null>(null);

export const CameraKit: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isInitialized = useRef<boolean>(false);
  const [session, setSession] = useState<CameraKitSession | null>(null);
  const [lenses, setLenses] = useState<Lens[]>([]);

  useEffect(() => {
    const initializeCameraKit = async () => {
      const cameraKit = await bootstrapCameraKit({ apiToken });
      const session = await cameraKit.createSession();
      const { lenses } = await cameraKit.lensRepository.loadLensGroups([
        lensGroupId,
      ]);

      setLenses(lenses);
      setSession(session);
    };

    if (isInitialized.current) return;
    isInitialized.current = true;

    initializeCameraKit();
  }, []);

  return !session ? (
    <div>Initializing Camera Kit...</div>
  ) : (
    <CameraKitContext.Provider value={{ session, lenses }}>
      {children}
    </CameraKitContext.Provider>
  );
};
