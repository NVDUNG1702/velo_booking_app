import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Components & Icons
import HeaderComponent from '../../../components/HeaderComponent';
import InputComponent from '../../../components/InputComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import LayoutComponent from '../../../layouts/LayoutComponent';

// Icons
import UserIcon from '../../../assets/IconComponents/UserIcon';
import EmailIcon from '../../../assets/IconComponents/EmailIcon';
import PhoneIcon from '../../../assets/IconComponents/PhoneIcon';
import InfoIcon from '../../../assets/IconComponents/InfoIcon';
import LockIcon from '../../../assets/IconComponents/LockIcon';

// Hooks & Store
import { useSafeAreaStyle } from '../../../hooks/size/usesafeArea';
import { useModeColor } from '../../../hooks/ColorMode/UseModeTheme';
import { authStore } from '../../../../stores/auth/auth.store';
import { SIZES } from '../../../constans/size';
import { UserFormUpdate } from '../../../models/authModel/signup.model';

// Interfaces
interface EditProfileProps {
  navigation: any;
}

type EditableFields = Exclude<keyof FormValues, 'avatar'>;

interface FormValues {
  username: string;
  email: string;
  phone: string;
  full_name: string;
  password: string;
  avatar?: string | null;
}

// Validation Schema
const schema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter your username!')
    .min(4, 'Must be between 4 and 50 characters.')
    .max(50, 'Must be between 4 and 50 characters.'),
  email: Yup.string().email('Invalid email!').required('Please enter your email!'),
  phone: Yup.string()
    .required('Please enter your phone number!')
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Invalid phone number!'),
  full_name: Yup.string().required('Please enter your full name!'),
  password: Yup.string()
    .required('Please enter your password!')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters and include a letter and number!'
    ),
});

const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
  const { backgroundStyle, textLight, skyBlue } = useModeColor();
  const { heightSafeArea } = useSafeAreaStyle();
  const { userDetail } = authStore();

  // State Avatar & Country Code
  const [avatar, setAvatar] = useState<string | null>(userDetail?.avatar || null);
  const [countryCode, setCountryCode] = useState('+84');

  const defaultValues: FormValues = {
    username: userDetail?.username || '',
    email: userDetail?.email || '',
    phone: userDetail?.phone || '',
    full_name: userDetail?.full_name || '',
    password: '******',
    avatar: userDetail?.avatar || null,
  };

  // React Hook Form Setup
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // Update Initial Form When `userDetail` Changes
  useEffect(() => {
    if (userDetail) {
      Object.entries(userDetail).forEach(([key, value]) => {
        setValue(key as keyof FormValues, value || '');
      });
      setAvatar(userDetail?.avatar || null);
    }
  }, [userDetail, setValue]);

  // Handle Image Picker
  const handleImagePicker = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setAvatar(uri || null);
          setValue('avatar', uri || null);
        }
      }
    );
  };

  const handleCamera = () => {
    launchCamera(
      { mediaType: 'photo', quality: 1, saveToPhotos: true },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setAvatar(uri || null);
          setValue('avatar', uri || null);
        }
      }
    );
  };

  const [editableFields, setEditableFields] = useState<Record<keyof UserFormUpdate, boolean>>({
    username: false,
    email: false,
    phone: false,
    full_name: false,
    password: false,
  });

  const toggleEditField = (field: EditableFields) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdateProfile: SubmitHandler<FormValues> = (data) => {
    console.log('Updated Data:', data);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };



  return (
    <LayoutComponent>
      <View style={[styles.container, backgroundStyle]}>
        <LoadingComponent loading={false} />
        <HeaderComponent navigation={navigation} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ width: '100%', height: heightSafeArea * 0.95 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.containerContent, { minHeight: heightSafeArea * 0.8 }]}>
            <View style={styles.titleContainer}>
              <Text style={[{ color: textLight }, styles.title]}>Edit Profile</Text>
            </View>

            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <Text style={{ color: textLight }}>No Avatar Selected</Text>
              )}
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
                  <Text style={{ color: 'white' }}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryButton} onPress={handleImagePicker}>
                  <Text style={{ color: skyBlue }}>Choose Photo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {(['username', 'email', 'phone', 'full_name', 'password'] as Array<keyof FormValues>).map(
                (field) => {
                  const labelMap: Record<keyof UserFormUpdate, string> = {
                    username: 'User Name',
                    email: 'Email',
                    phone: 'Phone Number',
                    full_name: 'Full Name',
                    password: 'Password',
                  };

                  const iconMap: Record<keyof UserFormUpdate, React.FC> = {
                    username: UserIcon,
                    email: EmailIcon,
                    phone: PhoneIcon,
                    full_name: InfoIcon,
                    password: LockIcon,
                  };

                  return (
                    <View key={field} style={styles.inputContainer}>
                      <Controller
                        control={control}
                        name={field}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <InputComponent
                            Icon={iconMap[field as keyof typeof iconMap]}
                            onChangeText={onChange}
                            value={value || ''}
                            errorMessage={errors?.[field]?.message}
                            placeholder={`Enter ${labelMap[field as keyof typeof labelMap]}`}
                            onBlur={onBlur}
                            type={field === 'password' ? 'password' : 'default'}
                            width={0.8}
                            editable={!!editableFields[field as keyof typeof editableFields]}
                          />
                        )}
                      />
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => toggleEditField(field as keyof typeof editableFields)}
                      >
                        <Text style={{ color: skyBlue }}>
                          {editableFields[field as keyof typeof editableFields] ? 'Save' : 'Edit'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              )}
            </View>

            <ButtonComponent
              label="Update Profile"
              marginT={10}
              marginB={5}
              onPress={handleSubmit(handleUpdateProfile)}
            />

            <TouchableOpacity onPress={handleGoBack} style={{ marginBottom: 55 }}>
              <Text style={{ color: skyBlue, textDecorationLine: 'underline' }}>
                Cancel and Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LayoutComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
  },
  titleContainer: {
    width: '90%',
    marginBottom: 20,
  },
  title: {
    fontSize: SIZES.t34,
    fontWeight: '600',
  },
  containerContent: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  editButton: {
    padding: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 20
    // justifyContent: ''
  },
  cameraButton: {
    width: '40%',
    backgroundColor: '#2ed2ff',
    alignItems: 'center',
    padding: 5
  },
  galleryButton: {
    width: '40%',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5
  }
});

export default EditProfile;