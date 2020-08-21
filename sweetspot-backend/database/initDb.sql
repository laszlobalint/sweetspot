PGDMP         7                x        	   sweetspot    12.4    12.4 +    @           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            A           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            B           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            C           1262    16393 	   sweetspot    DATABASE     �   CREATE DATABASE sweetspot WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Hungarian_Hungary.1250' LC_CTYPE = 'Hungarian_Hungary.1250';
    DROP DATABASE sweetspot;
                postgres    false            D           0    0    DATABASE sweetspot    COMMENT     C   COMMENT ON DATABASE sweetspot IS 'SweetSpot Development Database';
                   postgres    false    2883            v           1247    16454    order_delivery_enum    TYPE     R   CREATE TYPE public.order_delivery_enum AS ENUM (
    'SHIPPING',
    'PICK_UP'
);
 &   DROP TYPE public.order_delivery_enum;
       public          postgres    false            �            1259    16607 
   ingredient    TABLE     a   CREATE TABLE public.ingredient (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.ingredient;
       public         heap    postgres    false            �            1259    16605    ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.ingredient_id_seq;
       public          postgres    false    203            E           0    0    ingredient_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.ingredient_id_seq OWNED BY public.ingredient.id;
          public          postgres    false    202            �            1259    16631    item    TABLE     �  CREATE TABLE public.item (
    id integer NOT NULL,
    title character varying NOT NULL,
    picture character varying NOT NULL,
    glutenfree boolean NOT NULL,
    sugarfree boolean NOT NULL,
    ingredients text NOT NULL,
    allergens text NOT NULL,
    "orderId" integer NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    16629    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          postgres    false    207            F           0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          postgres    false    206            �            1259    16663 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    16661    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    211            G           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    210            �            1259    16644    order    TABLE     �  CREATE TABLE public."order" (
    id integer NOT NULL,
    name character varying NOT NULL,
    phone character varying NOT NULL,
    email character varying NOT NULL,
    address character varying NOT NULL,
    price integer NOT NULL,
    delivery public.order_delivery_enum DEFAULT 'SHIPPING'::public.order_delivery_enum NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false    630    630            �            1259    16642    order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.order_id_seq;
       public          postgres    false    209            H           0    0    order_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;
          public          postgres    false    208            �            1259    16618    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16616    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    205            I           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    204            �
           2604    16610    ingredient id    DEFAULT     n   ALTER TABLE ONLY public.ingredient ALTER COLUMN id SET DEFAULT nextval('public.ingredient_id_seq'::regclass);
 <   ALTER TABLE public.ingredient ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    16634    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    16666    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �
           2604    16647    order id    DEFAULT     f   ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
 9   ALTER TABLE public."order" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    16621    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            5          0    16607 
   ingredient 
   TABLE DATA           .   COPY public.ingredient (id, name) FROM stdin;
    public          postgres    false    203   >0       9          0    16631    item 
   TABLE DATA           �   COPY public.item (id, title, picture, glutenfree, sugarfree, ingredients, allergens, "orderId", "createdDate", "updateDate") FROM stdin;
    public          postgres    false    207   �6       =          0    16663 
   migrations 
   TABLE DATA           ;   COPY public.migrations (id, "timestamp", name) FROM stdin;
    public          postgres    false    211   �6       ;          0    16644    order 
   TABLE DATA           p   COPY public."order" (id, name, phone, email, address, price, delivery, "createdDate", "updateDate") FROM stdin;
    public          postgres    false    209   �6       7          0    16618    user 
   TABLE DATA           >   COPY public."user" (id, username, password, salt) FROM stdin;
    public          postgres    false    205   7       J           0    0    ingredient_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.ingredient_id_seq', 1, false);
          public          postgres    false    202            K           0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 1, false);
          public          postgres    false    206            L           0    0    migrations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);
          public          postgres    false    210            M           0    0    order_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.order_id_seq', 1, false);
          public          postgres    false    208            N           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    204            �
           2606    16655 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public            postgres    false    209            �
           2606    16615 )   ingredient PK_6f1e945604a0b59f56a57570e98 
   CONSTRAINT     i   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "PK_6f1e945604a0b59f56a57570e98";
       public            postgres    false    203            �
           2606    16671 )   migrations PK_8c82d7f526340ab734260ea46be 
   CONSTRAINT     i   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
       public            postgres    false    211            �
           2606    16626 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    205            �
           2606    16641 #   item PK_d3c0c71f23e7adcf952a1d13423 
   CONSTRAINT     c   ALTER TABLE ONLY public.item
    ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.item DROP CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423";
       public            postgres    false    207            �
           2606    16628 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public            postgres    false    205            �
           2606    16656 #   item FK_950e218c17c81d5a9ffa1b96080    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT "FK_950e218c17c81d5a9ffa1b96080" FOREIGN KEY ("orderId") REFERENCES public."order"(id);
 O   ALTER TABLE ONLY public.item DROP CONSTRAINT "FK_950e218c17c81d5a9ffa1b96080";
       public          postgres    false    2738    209    207            5   s  x�]V���6�ɯ`�6����A����6-Ӣ e'�_�ĥ�)L��*��W)�;��}�%)��9��]�}w4&B��&�V9�=Ӫy{44%�NB��q/f�4[u;)}4_�3�݋]?X��Г��ʑ��:w����V��6Z6gw5�G��	������0��tG�c��wn��ɬ��qך���l��;����Z�|&#�u;�GyN�%Z�3٪��-��"1#�$��ݎ�\-���G�����/�v7��5�S4N�|o��B��3�����H���7j��oh\C���a�0и|o���v׭�qE���O|��I}�5ҝp�0��b䅍R���I�Ѭ���4Mʒ���v�nN��Uc1��(>�$#� ǷG6g�6-�Mr�K4)��5e��MV�4�D�ئ�/��2����Eo�{iha�S#��r�OH��L�߅N��[��K;�N{��FN�fkd�n��=yg��/�=��d/�zf�G$K���������?V���N�j��eCo�bf�b4��f��%4��;�ŋ5T� 64K`i�(w=�)٫-�p;�2�G>v�2�<����|���GV��g[�}Z�4	�-�HƭfǾ>��H�ԨS竇Ifh��P4�0�A��IaSMi-������8����v�0���W�٫h��4�#J���<'�^k��X#��Ύ��8"���,a[u7�U�UG��ݭ��(8���"���ܓ�'_���H�b�-Z�"�Ɲh1�EF�[1խlh��ueN-
���N�X-�aH߾���o`XEuV��p��9٩�,��%_M3r��,�Նd�2Y��"Z½Bˌ�fd�s[�/�n�G�$�2
}~՗9��yAmŇV/+�U+�Y�*���Vq27[��?|��J@CwXJi��*#>p�[G��,I0��B�b5x4�J���ت�d�j@��#hv+�;�d!q����2�v������0��d%���������x��m��A�Fh��،�M��~�S�%�2��p�~�xT�6�U�� �Պ�B`����n����)&��ـ��d8��Cv@fZ��,���pk~WW-��;9x���
�AF�� �h��I0���e a��#��79H��ߚ�zB��S���)�Vao��z;��+@���xWA]�o!d[!0ןZL������a����ܧ����;Z��)�%��i�)X9N;��~�9w�8Xʨ�����������=�j�@����I���3��Ix��Z|�� G��E�����p��ط/>;x�0?��d�+-�R����#�k:��N>��I�r'��̋�ܩ~)�go� � ��Zw�C=�v�xts��L����Z���1@��yt��|My>݉,f�1�,5�^*�a�Nh'�#�*����{f�*�<[Aνr��j���G�:��&l<��ؼ�$+k0�����+4(l]���_��#�i�������`1`�w5���'��"�|�0��)��)���́�y�c���� k�7'�jyNޙ���V�Gh<za�w#���d.)hjyo|� ���6�9#��,�AO 	���@P�,=��(Hj������IA��V�)��/π�      9      x������ � �      =      x������ � �      ;      x������ � �      7   �   x�}�;�0  Й��UL��T>A� q)R��X�����ɕ�=�3!R�\�f�0��tl3ce��=�=�zH��ڬUU��'��њ������ �"���r����2^cF_�wY󨭆�Ɨ��N�Ɩ��,i}�â��`~R�]m�3�[ ��E�     